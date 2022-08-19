import NeonBox from "components/neon-box/neon-box";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { getQuestion, getUserNameFormatted } from "utils";

export const Question = () => {
  const { t, i18n } = useTranslation();

  const { questionLanguages, usersDetails, userForStoryTime } = useShallowEqualSelector(
    (state: RootState) => ({
      questionLanguages: state.room.gameState?.question?.questionLanguages,
      usersDetails: state.room.usersDetails,
      userForStoryTime: state.room.gameState?.userForStoryTime,
    }),
  );

  const question = getQuestion(questionLanguages, i18n);
  const userName = getUserNameFormatted(usersDetails, userForStoryTime as number);
  return (
    <NeonBox>
      <h1 className="text">
        {userName}, {t("think_fast.say_a_word_about")}: {question}
      </h1>
    </NeonBox>
  );
};
