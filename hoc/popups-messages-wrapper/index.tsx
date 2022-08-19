import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { registerNewPopup } from "./utils/register-new-popup";

interface Props {
  // tslint:disable-next-line: no-any
  children: any;
}

const closeMinutes = 15 * 60 * 1000;

export const PopupsMessagesWrapper = (props: Props) => {
  const { t } = useTranslation();
  useEffect(() => {
    registerNewPopup(
      "ask_feedback",
      t("messages.your_feedback_is_important_to_us"),
      closeMinutes,
      "https://forms.gle/EJf4PdTbWwPdQpTSA",
      15000,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return props.children;
};
