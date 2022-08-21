import { GameID, gamePrefix } from "utils";
import { gameManager } from "./game-manager.service";

const prefix = gamePrefix(GameID.CHARADES);

class CharadesService {
  startActOutTime(roomPin: string) {
    gameManager.sendMessage(`${prefix}.start-act-out`, {
      roomPin,
    });
  }

  addGuess(roomPin: string, userId: number, guess: string) {
    gameManager.sendMessage(`${prefix}.add-guess`, {
      roomPin,
      userId,
      guess,
    });
  }

  showResults(roomPin: string) {
    gameManager.sendMessage(`${prefix}.show-results`, {
      roomPin,
    });
  }
}

export const charadesService = new CharadesService();
