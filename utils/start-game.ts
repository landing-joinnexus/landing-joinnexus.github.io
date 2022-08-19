import { roomService } from "services/room.service";
import { gamePrefix } from "./game-prefix";

export const startGame = (gameId: number, roomPin: string, maxFails?: number) => () => {
  const startGameEvent = `${gamePrefix(gameId)}.start-game`;
  roomService.startGame(startGameEvent, roomPin, maxFails as number);
};
