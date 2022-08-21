import { Button, CircularProgress } from "@mui/material";
import { environment } from "environment";
import { sanitizeLanguage } from "lang/i18";
import { join, now, size } from "lodash";
import md5 from "md5";
import { Bill } from "models";
import { useEffect, useReducer } from "react";
import { TFunction, useTranslation } from "react-i18next";
import { billService } from "services/bill.service";
import { RootState, useShallowEqualSelector } from "store";
import { formPost } from "utils";
import { Actions, initialState, reducer } from "./bill-module.reducer";

const {
  paymentServiceProvider: {
    apiKey,
    merchantId,
    accountId,
    checkoutUrl,
    responseUrl,
    confirmationUrl,
  },
} = environment;

const currency = "USD";

const onSubmit =
  (
    t: TFunction<"translation", undefined>,
    pendingBillIds: Array<number> | undefined,
    language: string,
    referenceCode: string,
    amount: number | undefined,
    email: string | undefined,
  ) =>
  () => {
    if (!size(pendingBillIds)) {
      return;
    }

    const signature = md5(`${apiKey}~${merchantId}~${referenceCode}~${amount}~${currency}`);

    formPost(checkoutUrl as string, {
      merchantId,
      accountId,
      lng: language,
      description: `Nexus ${t("account.pay_as_you_go_plan")}`,
      referenceCode,
      amount,
      currency,
      signature,
      test: "true",
      buyerEmail: email,
      responseUrl,
      confirmationUrl,
      extra1: join(pendingBillIds, ","),
    });
  };

const BillModule = () => {
  const { t, i18n } = useTranslation();
  const [state, dispatch] = useReducer(reducer, initialState);
  const amount = state.pendingPrice;

  useEffect(() => {
    (async () => {
      const response = await billService.getBills();
      const responseBills: Array<Bill> = response.data;
      dispatch({ type: Actions.SET_BILLS, payload: responseBills });
    })();
  }, []);

  const { userId, email } = useShallowEqualSelector((rootState: RootState) => ({
    userId: rootState.user.id,
    email: rootState.user.email,
  }));

  const referenceCode = `internaut_nexus_pay_as_you_go_${userId}_${now()}`;

  const language = sanitizeLanguage(i18n.language);

  let action = <CircularProgress />;
  
  if (state.pendingPrice !== undefined) {
    action =
      state.pendingPrice > 0 ? (
        <Button
          onClick={onSubmit(t, state.pendingBillIds, language, referenceCode, amount, email)}
          variant="contained"
        >
          {t("bill.pay_pending_bills")}
        </Button>
      ) : (
        <label className="neon">{t("bill.you_have_no_pending_bills")}</label>
      );
  }

  return (
    <section>
      <div className="center">{action}</div>
    </section>
  );
};

export default BillModule;
