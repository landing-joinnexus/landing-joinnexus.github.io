import NeonBox from "components/neon-box/neon-box";
import { useTranslation } from "react-i18next";
import { useShallowEqualSelector, RootState } from "store";
import { getQuestion } from "utils";

interface Props {
  hasTheSameAnswer?: boolean;
}

export const Question = (props: Props) => {
  const { t, i18n } = useTranslation();
  const { questionLanguages, votes, usersForStoryTime, step } = useShallowEqualSelector(
    (state: RootState) => ({
      questionLanguages: state.room.gameState?.question?.questionLanguages,
      votes: state.room.gameState?.votes as Record<number, number>,
      usersForStoryTime: state.room.gameState?.usersForStoryTime || [],
      step: state.room.gameState?.step,
    }),
  );

  let message = getQuestion(questionLanguages, i18n);

  const [player1] = usersForStoryTime;

  if (props.hasTheSameAnswer && step === 2) {
    const prefix =
      votes[player1] === 1
        ? t("debate.all_users_agreed_with")
        : t("debate.all_users_disagreed_with");
    message = `${prefix}: ${message}`;
  }

  return (
    <NeonBox style={{maxWidth: '700px'}}>
      <h2 className="text">{message}</h2>
    </NeonBox>
  );
};
