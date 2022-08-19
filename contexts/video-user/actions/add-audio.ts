import { VideoUserState, VideoUserAction } from "../interfaces";

export const addAudio = (state: VideoUserState, action: VideoUserAction) => {
  const uid = `${action.payload?.uid}`;
  return {
    ...state,
    audio: {
      ...state.audio,
      [uid]: action.payload?.audioTrack,
    },
  };
};
