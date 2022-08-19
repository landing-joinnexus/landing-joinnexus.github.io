import whatsappIcon from "assets/images/whatsapp.webp";
import { useTranslation } from "react-i18next";
import Styles from "./index.module.css";

const openWhatsapp = (message: string) => () => {
  const url = `https://api.whatsapp.com/send?phone=573125256655&text=${message}`;
  window?.open(url, "_blank")?.focus();
};

export const WhatsappButton = () => {
  const { t } = useTranslation();
  return (
    <button className={Styles.whatsappButton} onClick={openWhatsapp(t("landing.whatsapp_message"))}>
      <img alt="whatsapp icon" src={whatsappIcon} />
      <label>{t("landing.whatsapp_button")}</label>
    </button>
  );
};
