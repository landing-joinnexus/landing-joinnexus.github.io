import { GameLanguage } from "./game-language.model";

export interface Game {
  id: number;
  gameLanguages: Array<GameLanguage>;
}
