import { LocalAudioTrack, LocalVideoTrack } from "twilio-video";
import { VideoUserAction, VideoUserState } from "../interfaces";

export const addUser = (state: VideoUserState, action: VideoUserAction) => {
  const uid = `${action.payload?.uid}`;

  return {
    ...state,
    participants: {
      ...state.participants,
      [uid]: action.participant,
    },
    video: {
      ...state.video,
      [uid]: (action.payload?.videoTrack as LocalVideoTrack)?.isEnabled
        ? action.payload?.videoTrack
        : undefined,
    },
    audio: {
      ...state.audio,
      [uid]: (action.payload?.audioTrack as LocalAudioTrack)?.isEnabled
        ? action.payload?.audioTrack
        : undefined,
    },
  };
};
