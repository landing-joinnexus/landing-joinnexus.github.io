import { Button, TextField } from "@mui/material";
import { environment } from "environment";
import { useFormik } from "formik";
import { FormikWrapper } from "hoc";
import jwt_decode from "jwt-decode";
import { User } from "models";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { TFunction, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { userService } from "services/user.service";
import { RootState, useShallowEqualSelector } from "store";
import { setUser } from "store/user.store";
import * as yup from "yup";
import Styles from "./user-information-module.module.css";

const { loginCookieKey } = environment;

const nameInput = (t: TFunction<"translation", undefined>) => (props: unknown) =>
  (
    <TextField
      data-testid="name-input"
      className={Styles.formElement}
      id="name"
      variant="outlined"
      label={t("common.name")}
      {...props}
    />
  );

const UserInformationModule = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_cookies, setCookie] = useCookies([loginCookieKey]);
  const { name } = useShallowEqualSelector((state: RootState) => ({
    name: state.user.name,
  }));

  const requiredMessage = t("common.is_required");

  const validationSchema = yup.object({
    name: yup.string().required(`${t("common.name")} ${requiredMessage}`),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (changes) => {
      const response = await userService.updateUserInformation(changes);
      const token = response.data.authenticationToken;
      setCookie(loginCookieKey, token);
      const userDecoded: User = jwt_decode(token);
      dispatch(setUser(userDecoded));
    },
  });

  useEffect(() => {
    if (!formik || !name) return;
    formik.setValues({
      name,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <form onSubmit={formik.handleSubmit} className={Styles.formContainer}>
      <FormikWrapper formik={formik} name="name">
        {nameInput(t)}
      </FormikWrapper>
      <Button id="submit-button" type="submit" className={Styles.formElement} variant="contained">
        {t("account.update_user_information")}
      </Button>
    </form>
  );
};

export default UserInformationModule;
