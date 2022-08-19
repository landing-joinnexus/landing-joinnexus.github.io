import { gamePrefix, GameID } from "utils";
import { gameManager } from "./game-manager.service";

const prefix = gamePrefix(GameID.NEVER_HAVE_I_EVER);

class NeverHaveIEverService {
  startStoryTimeSession(roomPin: string) {
    gameManager.sendMessage(`${prefix}.start-story-time-session`, { roomPin });
  }

  changeStoryTimeUser(roomPin: string) {
    gameManager.sendMessage(`${prefix}.change-story-time-user`, { roomPin });
  }
}

export const neverHaveIEverService = new NeverHaveIEverService();
