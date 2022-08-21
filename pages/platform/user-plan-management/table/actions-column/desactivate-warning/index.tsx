import { PlatformButton } from "components";
import { User } from "models";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Styles from "./index.module.css";

interface Props {
  user: User;
  handleClose: () => void;
  onClick: () => Promise<void>;
}

export const DesactivateWarning = (props: Props) => {
  const { t } = useTranslation();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const warningClass = isMouseOver ? Styles.underline : "";
  return (
    <div className={Styles.container}>
      <p className={Styles.message}>{t("user_plan_management.warning_1")}</p>
      <div>
        <label className={Styles.message}>{t("user_plan_management.warning_2")}</label>
        <label className={`${Styles.message} ${warningClass}`}> {props.user.name} </label>
        <label className={warningClass}> ({props.user.email})</label>?
      </div>
      <div className={Styles.buttonContainer}>
        <PlatformButton
          onMouseOver={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}
          onClick={props.onClick}
          isAlternative={true}
          label={t("common.yes")}
        />
        <PlatformButton onClick={props.handleClose} isAlternative={true} label={t("common.no")} />
      </div>
    </div>
  );
};
