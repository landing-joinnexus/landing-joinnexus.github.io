import { environment } from "environment";
import { get } from "utils";
import { WebSocketEvent } from "enums/websocket-event";
import { gameManager } from "./game-manager.service";

class CategoryService {
  getCategoriesByGameId(gameId: number) {
    return get(`${environment.categories.root}/game/${gameId}`);
  }

  selectCategory(roomPin: string, categoryId: number) {
    gameManager.sendMessage(WebSocketEvent.SELECT_CATEGORY, {
      roomPin,
      categoryId,
      operation: "add",
    });
  }

  unselectCategory(roomPin: string, categoryId: number) {
    gameManager.sendMessage(WebSocketEvent.SELECT_CATEGORY, {
      roomPin,
      categoryId,
      operation: "delete",
    });
  }
}

export const categoryService = new CategoryService();
