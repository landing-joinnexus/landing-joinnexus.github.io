import { useTranslation } from "react-i18next";

export const useNextStepButtonLabel = (
  storyUserIsTheSameUserInSession: boolean,
  userNameFormatted: string,
) => {
  const { t } = useTranslation();
  if (!storyUserIsTheSameUserInSession) {
    return `${t("common.waiting_for")} ${userNameFormatted} ${t("common.to_continue")}`;
  }

  return t("story_time.lets_listen_the_next_story");
};
