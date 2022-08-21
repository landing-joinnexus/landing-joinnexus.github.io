import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { Reactions } from "enums/reactions";
import { get } from "lodash";
import { hypotethicallyService } from "services/hypotethically.service";
import { RootState, useShallowEqualSelector } from "store";
import { reactionButtonStyle } from "./index.style";
import Styles from "./index.module.css";
import { getReactionIcon } from "./utils/get-reaction-icon";

interface Props {
  reaction: Reactions;
  displayCounter: boolean;
}

const sumReaction = (roomPin: string, userId: number, reaction: string, userIdReacted: number, execute = true) => () => {
  if (execute) hypotethicallyService.saveReaction(roomPin, userId, reaction, userIdReacted);
};

const ReactionButton = (props: Props) => {
  const { reaction, displayCounter } = props;
  const icon: string = getReactionIcon(reaction);

  const { roomPin, userForStoryTime, currentUserId, votes, reactions } = useShallowEqualSelector(
    (state: RootState) => ({
      roomPin: state.room.pin,
      userForStoryTime: state.room.gameState?.userForStoryTime,
      currentUserId: state.user.id,
      votes: state.room.gameState?.votes as Record<number, string>,
      // tslint:disable-next-line: no-any
      reactions: state.room.gameState?.reactions as Record<number, any>,
    }),
  );

  const userAnswer = get(votes, currentUserId as number);
  const userReactions = get(reactions, userForStoryTime as number);
  const buttonSelectedStyle = !!userAnswer && !displayCounter;

  let reactionCounter = null;
  if (displayCounter) {
    reactionCounter = <h3 className={"neon"}>{get(userReactions, reaction as string) || 0}</h3>;
  }
  const reactionButtonClassname = buttonSelectedStyle ? Styles.reactionGreyButton : displayCounter ? Styles.reactionResultButton : '';
  
  return (
    <div className={`centerContent ${displayCounter ? Styles.containerResults : ''}`}>
      <GameButton
        dataTestId={`reaction-button-${reaction}`}
        onClick={sumReaction(roomPin as string, userForStoryTime as number, reaction, currentUserId as number, !displayCounter)}
        backgroundImage={GalacticColors.NONE}
        imageSrc={icon}
        isDisabled={buttonSelectedStyle}
        isRound={true}
        className={`${Styles.reactionButton} ${reactionButtonClassname}`}
        style={reactionButtonStyle}
      />
      {reactionCounter}
    </div>
  );
};

export default ReactionButton;
