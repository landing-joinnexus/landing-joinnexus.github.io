import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { planService } from "services";
import { formatOnlyDate } from "utils";
import Styles from "./index.module.css";

export const Header = () => {
  const { t } = useTranslation();
  const [activeUntil, setActiveUntil] = useState();
  
  useEffect(() => {
    (async () => {
      const response = await planService.findUserPlan();
      setActiveUntil(response.data?.activeUntil);
    })();
  }, []);

  return (
    <>
      <div className={Styles.activeUntilContainer}>
        <div>
          <label className={Styles.title}>{t("billing.expiration_date")}</label>
          <label className={Styles.subtitle}>{formatOnlyDate(activeUntil)}</label>
        </div>
      </div>
      <h1 className={Styles.titlePage}>{t("billing.billing_information")}</h1>
    </>
  );
};
