import { compact, get, head, last, values } from "lodash";
import { LocalAudioTrack, LocalVideoTrack } from "twilio-video";
import { VideoUserAction, VideoUserState } from "../interfaces";
import { initialState } from "../reducer";

export const removeRoom = (state: VideoUserState, _action: VideoUserAction) => {
  const room = state.room;
  if (room) {
    const audioTrack: LocalAudioTrack = get(
      last(head(compact(Array.from(room?.localParticipant?.audioTracks as Map<string, unknown>)))),
      "track",
    );
    const videoTrack: LocalVideoTrack = get(
      last(head(compact(Array.from(room?.localParticipant?.videoTracks as Map<string, unknown>)))),
      "track",
    );
    audioTrack.stop();
    videoTrack.stop();
    room?.localParticipant.removeAllListeners();
    compact(values(state.participants)).forEach(participant => {
      participant.removeAllListeners();
    });
    room?.removeAllListeners();
    room?.disconnect();
  }

  return {
    ...initialState,
    room: undefined,
  };
};
