import { roomService } from "services/room.service";

export const openGame = (isHostUser: boolean, roomPin: string, gameId: number) => () => {
  if (!isHostUser) return;
  roomService.joinGame(roomPin, gameId);
};
