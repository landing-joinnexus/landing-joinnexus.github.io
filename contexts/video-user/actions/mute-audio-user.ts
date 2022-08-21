import { LocalAudioTrackPublication } from "twilio-video";
import { VideoUserState, VideoUserAction } from "../interfaces";

export const muteAudioUser = (state: VideoUserState, action: VideoUserAction) => {
  const uid = `${action.payload?.uid}`;
  (state.participants[uid].audioTracks as unknown as Array<LocalAudioTrackPublication>).forEach(
    track => track.track.disable(),
  );
  return {
    ...state,
    audio: {
      ...state.audio,
      [uid]: undefined,
    },
  };
};
