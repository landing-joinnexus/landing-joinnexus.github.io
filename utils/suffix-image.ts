import { GameID } from "utils";
import BombImage from "assets/images/bomb.webp";
import StarImage from "assets/images/star.webp";

export const suffixImage = (gameId: GameID) => {
  switch (gameId) {
    case GameID.THINK_FAST:
    case GameID.WHO_AM_I:
      return BombImage;
    default:
      return StarImage;
  }
};
