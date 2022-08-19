import { VideoUserState, VideoUserAction } from "../interfaces";

export const addVideo = (state: VideoUserState, action: VideoUserAction) => {
  const uid = `${action.payload?.uid}`;
  return {
    ...state,
    video: {
      ...state.video,
      [uid]: action.payload?.videoTrack,
    },
  };
};
