import GameOptions from "components/game-options/game-options";
import NeonBox from "components/neon-box/neon-box";
import VideoPlayers from "components/video-players/video-players";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { neonBoxStyle } from "styles/neonbox-style";
import { calculatePendingUserVotes, getQuestion, waitingVoteMessage } from "utils";

const ShowQuestion = () => {
  const { t, i18n } = useTranslation();

  const { usersDetails, votes, userId, questionLanguages, gameLanguages } = useShallowEqualSelector(
    (state: RootState) => ({
      usersDetails: state.room.usersDetails,
      votes: state.room.gameState?.votes as Record<number, number>,
      userId: state.user.id,
      questionLanguages: state.room.gameState?.question?.questionLanguages,
      gameLanguages: state.game.game?.gameLanguages,
    }),
  );

  const userAnswer = get(votes, userId as number);

  if (!gameLanguages) {
    return null;
  }

  const question = getQuestion(questionLanguages, i18n);

  let bottomSection = <GameOptions />;

  if (userAnswer) {
    bottomSection = (
      <h2 className="neon">
        {waitingVoteMessage(t, calculatePendingUserVotes(usersDetails, votes))}
      </h2>
    );
  }

  return (
    <>
      <NeonBox style={neonBoxStyle}>
        <h2>
          {t("never_have_i_ever.prefix")} {question}
        </h2>
      </NeonBox>
      <VideoPlayers />
      <div>{bottomSection}</div>
    </>
  );
};

export default ShowQuestion;
