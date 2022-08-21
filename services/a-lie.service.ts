import { gamePrefix, GameID } from "utils";
import { gameManager } from "./game-manager.service";

const prefix = gamePrefix(GameID.A_LIE);

class ALieService {
  saveVote(roomPin: string, optionId: string, userId: number) {
    gameManager.sendMessage(`${prefix}.save-vote`, { roomPin, optionId, userId });
  }
}

export const aLieService = new ALieService();
