import { CircularProgress } from "@mui/material";
import { GameButton } from "components";
import NeonBox from "components/neon-box/neon-box";
import ReactionsComponent from "components/reactions-component";
import ShowUsersWithFocus from "components/show-users-with-focus/show-users-with-focus";
import { GalacticColors } from "enums/galactic-backgrounds";
import { useStoryUserIsTheSameUserInSession } from "hooks/story-user-is-the-same-user-in-session";
import { ReactElement, useEffect, useState } from "react";
import { RootState, useShallowEqualSelector } from "store";
import { getUserNameFormatted } from "utils";
import { useMessageInNeonBox } from "./utils/use-message-in-neon-box";
import { useNextStepButtonLabel } from "./utils/use-next-step-button-label";
import Styles from './index.module.css';

interface Props {
  nextStep: (roomPin: string) => void;
  questionPrefix: string;
  questionSuffix: string;
  storyTimePrefix?: string;
  storyTimeSuffix?: string;
  reactionComponent?: boolean;
  underline?: string;
}

export const ShowUserInStoryTime = (props: Props) => {
  const [showActionButton, setShowActionButton] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowActionButton(true);
    }, 5000);
  }, []);

  const { roomPin, userForStoryTime, usersDetails } = useShallowEqualSelector(
    (state: RootState) => ({
      roomPin: state.room.pin,
      userForStoryTime: state.room.gameState?.userForStoryTime,
      usersDetails: state.room.usersDetails,
    }),
  );

  const storyUserIsTheSameUserInSession = useStoryUserIsTheSameUserInSession();
  
  const userNameFormatted = getUserNameFormatted(usersDetails, userForStoryTime as number);
  const displayReaction = props.reactionComponent && !storyUserIsTheSameUserInSession;
  
  const messageInNeonBox = useMessageInNeonBox(
    props.questionPrefix,
    props.questionSuffix,
    storyUserIsTheSameUserInSession,
    userNameFormatted,
    props.storyTimePrefix,
    props.storyTimeSuffix,
    props.underline,
  );

  const nextButtonLabel = useNextStepButtonLabel(
    storyUserIsTheSameUserInSession,
    userNameFormatted,
  );

  let actionButton: (ReactElement | null) = showActionButton ? (
    <GameButton
      onClick={() => props.nextStep(roomPin as string)}
      backgroundImage={GalacticColors.BLUE}
      label={nextButtonLabel}
      isDisabled={!storyUserIsTheSameUserInSession}
    />
  ) : (
    <CircularProgress />
  );

  const shouldShowReaction = displayReaction && props.reactionComponent;
  if (shouldShowReaction) {
    actionButton = null;
  }

  const reactionComponent = displayReaction ? <ReactionsComponent displayReactionCounter={false} /> : null;

  return (
    <>
      <NeonBox className={Styles.messageContainer}>
        <h2>{messageInNeonBox}</h2>
      </NeonBox>
      <ShowUsersWithFocus displayReaction={displayReaction} />
      {actionButton}
      {reactionComponent}
    </>
  );
};
