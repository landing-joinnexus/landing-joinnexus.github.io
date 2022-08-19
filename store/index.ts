import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "store/game.store";
import roomReducer from "store/room.store";
import userReducer from "store/user.store";
import videoReducer from "store/video.store";

export const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    game: gameReducer,
    video: videoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from "./utils";
