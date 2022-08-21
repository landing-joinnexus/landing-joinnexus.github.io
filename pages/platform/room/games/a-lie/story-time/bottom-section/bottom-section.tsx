import { CircularProgress } from "@mui/material";
import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { aLieService } from "services/a-lie.service";
import { RootState, useShallowEqualSelector } from "store";
import { calculatePendingUserVotes, waitingVoteMessage } from "utils";
import { options } from "../../tools/options";
import Styles from "./bottom-section.module.css";

const gamePrefix = "a_lie";

const saveVote = (roomPin: string, option: string, userId: number) => () => {
  aLieService.saveVote(roomPin, option, userId);
};

const BottomSection = () => {
  const { t } = useTranslation();

  const [showActionButtons, setShowActionButtons] = useState(false);

  const { currentUserId, usersDetails, roomPin, votes } = useShallowEqualSelector(
    (state: RootState) => ({
      currentUserId: state.user.id,
      usersDetails: state.room.usersDetails,
      roomPin: state.room.pin,
      votes: state.room.gameState?.votes as Record<number, string>,
    }),
  );

  useEffect(() => {
    setTimeout(() => {
      setShowActionButtons(true);
    }, 5000);
  }, []);

  const userAnswer = get(votes, currentUserId as number);
  if (userAnswer) {
    return (
      <h2 className="neon">
        {waitingVoteMessage(
          t,
          calculatePendingUserVotes(usersDetails, votes),
          "a_lie.chooses_the_lie",
          "a_lie.choose_the_lie",
        )}
      </h2>
    );
  }

  const action = showActionButtons ? (
    options.map(option => (
      <div key={option}>
        <GameButton
          onClick={saveVote(roomPin as string, option, currentUserId as number)}
          backgroundImage={GalacticColors.BLUE}
          className={Styles.button}
          label={`${t(`${gamePrefix}.${option}`)} ${t(`${gamePrefix}.is_the_lie`)}`}
        />
      </div>
    ))
  ) : (
    <CircularProgress />
  );

  return <section className={Styles.buttonContainer}>{action}</section>;
};

export default BottomSection;
