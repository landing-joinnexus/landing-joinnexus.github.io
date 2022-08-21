import { environment } from "environment";
import { get } from "utils";

class GameService {
  findGamesWithDetails() {
    return get(`${environment.games.root}`);
  }

  findGameWithDetails(gameId: number) {
    return get(`${environment.games.root}/${gameId}`);
  }
}

export const gameService = new GameService();
