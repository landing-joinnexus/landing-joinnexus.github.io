import { SendMessage } from "react-use-websocket";

class GameManager {
  public nativeSendMessage?: SendMessage;

  sendMessage(event: string, payload: Record<string, unknown>) {
    if (!this.nativeSendMessage) return;
    this.nativeSendMessage(JSON.stringify({ event, payload }));
  }
}

export const gameManager = new GameManager();
