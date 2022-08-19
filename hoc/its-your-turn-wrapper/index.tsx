import { useStoryUserIsTheSameUserInSession } from "hooks/story-user-is-the-same-user-in-session";
import { ReactElement, ReactNode, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

interface Props {
  children: ReactNode;
  customMessage?: string;
}
export const ItsYourTurnWrapper = (props: Props) => {
  const { t } = useTranslation();

  const isUserInSession = useStoryUserIsTheSameUserInSession();

  useEffect(() => {
    if (!isUserInSession) return;
    const message = props.customMessage || t("common.its_your_turn");
    toast.info(message, {
      autoClose: 1000 * 10 // 10 seconds
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserInSession]);
  
  return props.children as ReactElement;
};
