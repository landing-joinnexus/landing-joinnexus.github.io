import { useTranslation } from "react-i18next";
import Styles from "./index.module.css";
import CheckImage from "assets/icons/platform/check.webp";
import CelebrateImage from "assets/icons/platform/celebrate.webp";
import { PlatformButton } from "components";

interface Props {
  email: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUserAdded: React.Dispatch<React.SetStateAction<string>>;
}

export const UserAdded = (props: Props) => {
  const { t } = useTranslation();

  const close = () => {
    props.setUserAdded("");
    props.setIsOpen(false);
  };

  return (
    <div className={Styles.container}>
      <div>
        <div className={Styles.contentContainer}>
          <div className={Styles.messageContainer}>
            <label className={Styles.text}>{t("user_plan_management.the_premium_user")}</label>
            <label> {props.email} </label>
            <label className={Styles.text}>{t("user_plan_management.has_been_added")}</label>
          </div>
          <img className={Styles.check} src={CheckImage} alt="check" />
        </div>
        <div>
          <label>{t("user_plan_management.surely_this_calls_for_a_celebration")} </label>
          <img className={Styles.celebrate} src={CelebrateImage} alt="celebrate" />
        </div>
      </div>
      <div className={Styles.actionContainer}>
        <PlatformButton onClick={close} label={t("common.accept")} />
      </div>
    </div>
  );
};
