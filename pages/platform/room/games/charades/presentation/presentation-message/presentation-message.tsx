import { useStoryUserIsTheSameUserInSession } from "hooks/story-user-is-the-same-user-in-session";
import { sanitizeLanguage } from "lang/i18";
import { upperFirst } from "lodash";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { getUserNameFormatted } from "utils";
import Styles from "./presentation-message.module.css";

export const PresentationMessage = () => {
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

  if (storyUserIsTheSameUserInSession) {
    const currentLanguage = sanitizeLanguage(i18n.language);
    const question = questionLanguages?.find(
      questionLanguage => questionLanguage.languageId === currentLanguage,
    );
    return (
      <>
        <h3 className={`text ${Styles.message}`}>
          {userNameFormatted}, {t("charades.you_have_been_chosen_to_act_out_this_word")}:
        </h3>
        <h2 className={`text ${Styles.message} ${Styles.word}`}>{upperFirst(question?.label)}</h2>
        <label className={`text ${Styles.message}`}>
          {t("charades.think_your_performance_and")}
        </label>
        <label className={`text ${Styles.message} underline`}>
          {t("charades.click_on_the_button")}
        </label>
      </>
    );
  }

  return (
    <h2 className="text">
      {userNameFormatted} {t("charades.has_been_chosen_to_act_out_a_word")}
    </h2>
  );
};

export default PresentationMessage;
