import { environment } from "environment";
import { get, post, deleteHttp } from "utils";
import { WebSocketEvent } from "enums/websocket-event";
import { gameManager } from "./game-manager.service";
import { set } from "lodash";

export class RoomService {
  findRoomByPin(pin: string | undefined) {
    return get(`${environment.rooms.root}/pin/${pin}`);
  }

  createRoom() {
    return post(`${environment.rooms.root}`);
  }

  deleteRoom() {
    return deleteHttp(`${environment.rooms.root}`);
  }

  getToken(pin: string | undefined) {
    return get(`${environment.rooms.root}/token/${pin}`);
  }

  joinGame(roomPin: string, gameId: number) {
    gameManager.sendMessage(WebSocketEvent.JOIN_GAME, { gameId, roomPin });
  }

  goToRoomHome(roomPin: string) {
    gameManager.sendMessage(WebSocketEvent.GO_TO_ROOM_HOME, { roomPin });
  }

  startGame(gameEvent: string, roomPin: string, maxFails: number) {
    const params = { roomPin };
    if (maxFails) {
      set(params, "maxFails", maxFails);
    }
    gameManager.sendMessage(gameEvent, params);
  }

  voteGame(gameEvent: string, roomPin: string, optionId: number, userId: number) {
    gameManager.sendMessage(gameEvent, { roomPin, optionId, userId });
  }
}

export const roomService = new RoomService();
