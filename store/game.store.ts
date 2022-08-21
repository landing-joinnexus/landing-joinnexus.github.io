import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, Game } from "models";

export interface GameState {
  games: Array<Game>;
  game?: Game;
  categories?: Array<Category>;
}

const initialState: GameState = {
  games: [],
  categories: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<Array<Game>>) => {
      const { payload } = action;
      state.games = payload;
    },
    setGame: (state, action: PayloadAction<Game>) => {
      const { payload } = action;
      state.game = payload;
    },
    setGameWithCategory: (
      state,
      action: PayloadAction<{ game: Game; categories: Array<Category> }>,
    ) => {
      const { payload } = action;
      state.game = payload.game;
      state.categories = payload.categories;
    },
  },
});

export const { setGames, setGame, setGameWithCategory } = gameSlice.actions;

export default gameSlice.reducer;
