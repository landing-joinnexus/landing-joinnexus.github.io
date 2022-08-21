import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { roomService } from "services/room.service";
import { RootState, useShallowEqualSelector } from "store";
import { gamePrefix } from "utils";
import { gameButtonStyle } from "./game-option.style";

interface Props {
  id: number;
  label: string;
  isPositive: boolean;
}

const vote = (gameId: number, roomPin: string, optionId: number, userId: number) => () => {
  const gameEvent = `${gamePrefix(gameId)}.save-vote`;
  roomService.voteGame(gameEvent, roomPin, optionId, userId);
};

const GameOption = (props: Props) => {
  const optionId = props.id;
  const { userId, roomPin, gameId } = useShallowEqualSelector((rootState: RootState) => ({
    userId: rootState.user.id,
    roomPin: rootState.room.pin,
    gameId: rootState.room.gameId,
  }));

  const backgroundImage = props.isPositive ? GalacticColors.BLUE : GalacticColors.RED;

  return (
    <GameButton
      onClick={vote(gameId as number, roomPin as string, optionId, userId as number)}
      style={gameButtonStyle}
      label={props.label}
      backgroundImage={backgroundImage}
    />
  );
};

export default GameOption;
