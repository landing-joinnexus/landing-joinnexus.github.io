import { gamePrefix, GameID } from "utils";
import { gameManager } from "./game-manager.service";

const prefix = gamePrefix(GameID.DEBATE);

class DebateService {
  saveVote(roomPin: string, optionId: 1 | 2, userId: number) {
    gameManager.sendMessage(`${prefix}.save-vote`, {
      roomPin,
      optionId,
      userId,
    });
  }
}

export const debateService = new DebateService();
