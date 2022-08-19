import { gamePrefix, GameID } from "utils";
import { gameManager } from "./game-manager.service";

const prefix = gamePrefix(GameID.DEEP_QUESTIONS);

class DeepQuestionsService {
  startStoryTimeSession(roomPin: string) {
    gameManager.sendMessage(`${prefix}.start-story-time-session`, { roomPin });
  }

  changeStoryTimeUser(roomPin: string) {
    gameManager.sendMessage(`${prefix}.change-story-time-user`, { roomPin });
  }

  saveReaction(roomPin: string, userId: number, reaction: string, userIdReacted: number) {
    gameManager.sendMessage(`${prefix}.save-reaction`, {
      roomPin,
      userId,
      reaction,
      userIdReacted,
    });
  }
}

export const deepQuestionsService = new DeepQuestionsService();
