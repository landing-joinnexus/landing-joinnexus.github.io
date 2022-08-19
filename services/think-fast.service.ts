import { GameID, gamePrefix } from "utils";
import { gameManager } from "./game-manager.service";

const prefix = gamePrefix(GameID.THINK_FAST);

class ThinkFastService {
  nextPlayer(roomPin: string) {
    gameManager.sendMessage(`${prefix}.next-player`, { roomPin });
  }

  addFail(roomPin: string, loserId: number) {
    gameManager.sendMessage(`${prefix}.add-fail`, { roomPin, loserId });
  }

  showResults(roomPin: string) {
    gameManager.sendMessage(`${prefix}.show-results`, { roomPin });
  }
}

export const thinkFastService = new ThinkFastService();
