import VideoPlayers from "components/video-players/video-players";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { calculatePendingUserVotes, waitingVoteMessage } from "utils";
import { Question } from "../components/question";
import { GameOptions } from "./game-options";

export const ShowQuestions = () => {
  const { t } = useTranslation();
  const { usersDetails, votes, userId } = useShallowEqualSelector(
    (state: RootState) => ({
      usersDetails: state.room.usersDetails,
      votes: state.room.gameState?.votes as Record<number, number>,
      userId: state.user.id,
    }),
  );


  let bottomSection = <GameOptions />;

  const userAnswer = get(votes, userId as number);

  if (userAnswer) {
    bottomSection = (
      <h2 className="neon">
        {waitingVoteMessage(t, calculatePendingUserVotes(usersDetails, votes))}
      </h2>
    );
  }

  return (
    <>
      <Question />
      <VideoPlayers />
      <div>{bottomSection}</div>
    </>
  );
}