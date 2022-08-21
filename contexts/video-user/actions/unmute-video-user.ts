import { get, last, head, compact } from "lodash";
import { LocalVideoTrackPublication } from "twilio-video";
import { VideoUserState, VideoUserAction } from "../interfaces";

export const unmuteVideoUser = (state: VideoUserState, action: VideoUserAction) => {
  const uid = `${action.payload?.uid}`;
  (state.participants[uid].videoTracks as unknown as Array<LocalVideoTrackPublication>).forEach(
    async track => {
      await track.track.enable();
    },
  );
  return {
    ...state,
    video: {
      ...state.video,
      [uid]: get(last(head(compact(Array.from(state.participants[uid].videoTracks)))), "track"),
    },
  };
};
