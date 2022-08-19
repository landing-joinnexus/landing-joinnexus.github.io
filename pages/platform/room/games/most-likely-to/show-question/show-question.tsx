import { GameButton } from "components";
import NeonBox from "components/neon-box/neon-box";
import VideoPlayers from "components/video-players/video-players";
import { GalacticColors } from "enums/galactic-backgrounds";
import { get, head, split } from "lodash";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { mostLikelyToService } from "services/most-likely-to.service";
import { RootState, useShallowEqualSelector } from "store";
import { neonBoxStyle } from "styles/neonbox-style";
import { calculatePendingUserVotes, getQuestion, waitingVoteMessage } from "utils";


const voteForUser = (roomPin: string, currentUserId: number) => (userId: number) => {
  mostLikelyToService.saveVote(roomPin, userId, currentUserId);
};

const ShowQuestion = () => {
  const { t, i18n } = useTranslation();
  const [userSelected] = useState<number | null>(null);

  const { questionLanguages, usersDetails, roomPin, votes, currentUserId } =
    useShallowEqualSelector((state: RootState) => ({
      questionLanguages: state.room?.gameState?.question?.questionLanguages,
      usersDetails: state.room.usersDetails,
      roomPin: state.room.pin,
      votes: state.room.gameState?.votes,
      currentUserId: state.user.id,
    }));

  const question = getQuestion(questionLanguages, i18n);

  let buttonLabel = t("common.select_an_user_please");
  if (userSelected) {
    const userName = usersDetails[Number(userSelected)]?.name;
    const firstUserName = head(split(userName, " "));
    buttonLabel = `${t("common.vote_for")} ${firstUserName}`;
  }

  let bottomSection = (
    <GameButton
      backgroundImage={GalacticColors.BLUE}
      label={buttonLabel}
      isDisabled={!userSelected}
    />
  );
  const highlightUsers = [];
  if (userSelected) {
    highlightUsers.push(userSelected);
  }
  const userAnswer = get(votes, currentUserId as number);
  if (userAnswer) {
    highlightUsers.push(userAnswer);
    bottomSection = (
      <h2 className="neon">
        {waitingVoteMessage(
          t,
          calculatePendingUserVotes(usersDetails, votes as Record<number, number>),
        )}
      </h2>
    );
  }

  return (
    <>
      <NeonBox style={neonBoxStyle}>
        <h2 className="neon">
          {t("most_likely_to.question_prefix")} {question}?
        </h2>
      </NeonBox>
      <VideoPlayers
        onClick={voteForUser(roomPin as string, currentUserId as number)}
        highlightUsers={highlightUsers}
        width="700px"
        isVertical={true}
        hideUser={true}
        fitMaxLayout={true}
      />
      {bottomSection}
    </>
  );
};

export default ShowQuestion;
