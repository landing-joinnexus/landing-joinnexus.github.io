import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";
import { GameState, Room } from "models";

interface UserDetail {
  connectionId: string;
  name: string;
  _id: string;
  connectionLag?: number;
}

export interface RoomState {
  id?: string;
  pin?: string;
  ownerUserId?: number;
  hostUserId?: number;
  hostUsername?: string;
  maxUsersPerRoom?: number;
  gameId?: number;
  backgroundImage?: string;
  usersDetails: Record<string, UserDetail>;
  usersIdsOrder: Array<number>;
  gameState?: GameState;
  categories: Array<number>;
}

const initialState: RoomState = {
  backgroundImage: `${process.env.PUBLIC_URL}/assets/backgrounds/main_background.webp`,
  usersDetails: {},
  usersIdsOrder: [],
  gameState: {
    step: 0,
    counter: {},
  },
  categories: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setBackgroundImage: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.backgroundImage = payload;
    },
    setRoomState: (state, action: PayloadAction<Room>) => {
      const { payload } = action;
      state.id = payload._id;
      state.hostUserId = payload.hostUserId;
      state.hostUsername = payload.hostUsername;
      state.maxUsersPerRoom = payload.maxUsersPerRoom;
      state.ownerUserId = payload.ownerUserId;
      state.pin = payload.pin;
      state.usersDetails = payload.usersDetails;
      state.usersIdsOrder = payload.usersIdsOrder;
      state.gameId = payload.gameId;
      state.categories = payload.categories;
      state.gameState = payload.gameState;
    },
    cleanRoomState: state => {
      state = cloneDeep(initialState);
    },
  },
});

export const { setBackgroundImage, setRoomState, cleanRoomState } = roomSlice.actions;

export default roomSlice.reducer;
