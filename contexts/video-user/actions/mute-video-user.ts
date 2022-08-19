import { LocalVideoTrackPublication } from "twilio-video";
import { VideoUserState, VideoUserAction } from "../interfaces";

export const muteVideoUser = (state: VideoUserState, action: VideoUserAction) => {
  const uid = `${action.payload?.uid}`;
  (state.participants[uid].videoTracks as unknown as Array<LocalVideoTrackPublication>).forEach(
    track => track.track.disable(),
  );
  return {
    ...state,
    video: {
      ...state.video,
      [uid]: undefined,
    },
  };
};
