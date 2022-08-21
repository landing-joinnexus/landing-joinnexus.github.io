import { VideoUserState, VideoUserAction } from "../interfaces";

export const removeAudio = (state: VideoUserState, action: VideoUserAction) => {
  const uid = `${action.payload?.uid}`;
  const audioTrack = state.audio[uid];
  if (audioTrack) {
    audioTrack.detach();
  }
  return {
    ...state,
    audio: {
      ...state.audio,
      [uid]: undefined,
    },
  };
};
