import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Plan, User } from "models";

export interface UserState {
  token?: string | null;
  name?: string;
  picture?: string;
  accessToken?: string;
  lastLoginAt?: string;
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  plan?: Plan;
  email?: string;
}

const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.token = payload;
    },
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      const { payload } = action;
      state.id = payload.id;
      state.name = payload.name;
      state.accessToken = payload.accessToken;
      state.picture = payload.picture;
      state.lastLoginAt = payload.lastLoginAt;
      state.createdAt = payload.createdAt;
      state.updatedAt = payload.updatedAt;
      state.plan = payload.plan;
      state.email = payload.email;
    },
    updateUserInformation: (state, action: PayloadAction<Partial<User>>) => {
      const { payload } = action;
      state.name = payload.name;
    },
  },
});

export const { setToken, setUser, updateUserInformation } = userSlice.actions;

export default userSlice.reducer;
