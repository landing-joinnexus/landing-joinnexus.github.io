import { VideoUserState, VideoUserAction } from "../interfaces";

export const removeUser = (state: VideoUserState, action: VideoUserAction) => {
  const uid = `${action.payload?.uid}`;
  const currentParticipant = state.participants[String(uid)];
  if (currentParticipant) {
    currentParticipant.removeAllListeners();
  }
  return {
    ...state,
    participants: {
      ...state.participants,
      [uid]: undefined,
    },
    video: {
      ...state.video,
      [uid]: undefined,
    },
    audio: {
      ...state.audio,
      [uid]: undefined,
    },
  };
};
