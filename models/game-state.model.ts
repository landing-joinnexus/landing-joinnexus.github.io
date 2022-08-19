import { GameChatMessage } from "./game-chat-message.model";
import { Question } from "./question.model";

export interface GameState {
  step: number;
  question?: Question;
  // tslint:disable-next-line: no-any
  votes?: Record<number, any>;
  // tslint:disable-next-line: no-any
  reactions?: Record<number, any>;
  usersForStoryTime?: Array<number>;
  userForStoryTime?: number;
  gameChat?: Array<GameChatMessage>;
  storyTimeEndAt?: number;
  storyTimeStartAt?: number;
  counter: Record<number, number>;
  maxCounter?: number;
  storyTimeDuration?: number;
}
