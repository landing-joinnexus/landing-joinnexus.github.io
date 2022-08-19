import { GameID, gamePrefix } from "utils";
import { gameManager } from "./game-manager.service";

const prefix = gamePrefix(GameID.MOST_LIKELY_TO);

class MostLikelyToService {
  saveVote(roomPin: string, optionId: number, userId: number) {
    gameManager.sendMessage(`${prefix}.save-vote`, { roomPin, optionId, userId });
  }

  changeStoryTimeUser(roomPin: string) {
    gameManager.sendMessage(`${prefix}.change-story-time-user`, { roomPin });
  }
}

export const mostLikelyToService = new MostLikelyToService();
