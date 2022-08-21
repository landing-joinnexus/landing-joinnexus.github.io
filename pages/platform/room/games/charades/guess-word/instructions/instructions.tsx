import { useStoryUserIsTheSameUserInSession } from "hooks/story-user-is-the-same-user-in-session";
import { sanitizeLanguage } from "lang/i18";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { getUserNameFormatted } from "utils";

const Instructions = () => {
  const { t, i18n } = useTranslation();
  const { userForStoryTime, usersDetails, questionLanguages } = useShallowEqualSelector(
    (state: RootState) => ({
      userForStoryTime: state.room.gameState?.userForStoryTime,
      usersDetails: state.room.usersDetails,
      questionLanguages: state.room.gameState?.question?.questionLanguages,
    }),
  );
  const storyUserIsTheSameUserInSession = useStoryUserIsTheSameUserInSession();
  const userNameFormatted = getUserNameFormatted(usersDetails, userForStoryTime as number);
  const currentLanguage = sanitizeLanguage(i18n.language);
  const question = questionLanguages?.find(
    questionLanguage => questionLanguage.languageId === currentLanguage,
  );

  if (storyUserIsTheSameUserInSession) {
    return (
      <>
        <h3 className="text">{t("charades.you_have_to_act_out_this_word")}</h3>
        <h2 className="text neon">{question?.label}</h2>
      </>
    );
  }

  return (
    <h3 className="text">
      {t("charades.you_have_to_guess_the_word_that")} {userNameFormatted}{" "}
      {t("charades.is_acting_out")}
    </h3>
  );
};

export default Instructions;
