import { VideoUserState, VideoUserAction } from "../interfaces";

export const addRoom = (state: VideoUserState, action: VideoUserAction) => {
  return {
    ...state,
    room: action.room,
  };
};
