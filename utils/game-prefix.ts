import { GameID } from "./game-id";

export const gamePrefix = (gameId: number) => {
  switch (gameId) {
    case GameID.NEVER_HAVE_I_EVER:
      return "never_have_i_ever";
    case GameID.MOST_LIKELY_TO:
      return "most_likely_to";
    case GameID.A_LIE:
      return "a_lie";
    case GameID.CHARADES:
      return "charades";
    case GameID.THINK_FAST:
      return "think_fast";
    case GameID.HYPOTETHICALLY:
      return "hypotethically";
    case GameID.DEEP_QUESTIONS:
      return "deep_questions";
    case GameID.DEBATE:
      return "debate";
    case GameID.WHO_AM_I:
      return "who_am_i";
    case GameID.TRIVIA:
      return "trivia";
  }
};
