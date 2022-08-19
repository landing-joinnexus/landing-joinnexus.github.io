import { compact, get, head, last } from "lodash";
import { LocalAudioTrackPublication } from "twilio-video";
import { VideoUserState, VideoUserAction } from "../interfaces";

export const unmuteAudioUser = (state: VideoUserState, action: VideoUserAction) => {
  const uid = `${action.payload?.uid}`;
  (state.participants[uid].audioTracks as unknown as Array<LocalAudioTrackPublication>).forEach(
    track => track.track.enable(),
  );
  return {
    ...state,
    audio: {
      ...state.audio,
      [uid]: get(last(head(compact(Array.from(state.participants[uid].audioTracks)))), "track"),
    },
  };
};
