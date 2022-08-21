import { GameState } from "./game-state.model";
import { UserDetail } from "./user-detail.model";

export interface Room {
  _id: string;
  pin: string;
  ownerUserId: number;
  hostUserId: number;
  hostUsername: string;
  maxUsersPerRoom: number;
  expirationAt: string;
  usersDetails: Record<string, UserDetail>;
  usersIdsOrder: Array<number>;
  gameId: number;
  gameState: GameState;
  categories: Array<number>;
}
