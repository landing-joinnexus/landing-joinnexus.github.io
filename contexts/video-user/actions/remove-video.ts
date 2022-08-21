import { VideoUserState, VideoUserAction } from "../interfaces";

export const removeVideo = (state: VideoUserState, action: VideoUserAction) => {
  const uid = `${action.payload?.uid}`;

  const videoTrack = state.video[uid];
  if (videoTrack) {
    videoTrack.detach();
  }
  return {
    ...state,
    video: {
      ...state.video,
      [uid]: undefined,
    },
  };
};
