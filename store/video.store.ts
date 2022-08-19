import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cloneDeep } from "lodash";

export interface VideoState {
  uid?: string;
  videoTrackReady?: boolean;
  usersHash: string;
}

const initialState: VideoState = {
  usersHash: "",
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setUID: (state, action: PayloadAction<number | string>) => {
      const { payload } = action;
      state.uid = String(payload);
    },
    setVideoTrackReady: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.videoTrackReady = payload;
    },
    setUserHash: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.usersHash = payload;
    },
    cleanStore: state => {
      state = cloneDeep(initialState);
    },
  },
});

export const { setUID, setVideoTrackReady, setUserHash, cleanStore } = videoSlice.actions;

export default videoSlice.reducer;
