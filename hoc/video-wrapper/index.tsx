import { VideoUserAction, VideoUserActionAction, VideoUserState } from "contexts";
import { head } from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { roomService } from "services/room.service";
import { RootState, useShallowEqualSelector } from "store";
import { setUID } from "store/video.store";
import {
  connect,
  createLocalTracks,
  LocalVideoTrackPublication,
  RemoteAudioTrack,
  RemoteAudioTrackPublication,
  RemoteParticipant,
  RemoteVideoTrack,
  RemoteVideoTrackPublication,
} from "twilio-video";
import { Audios } from "./audios";

interface Props {
  children?: React.ReactNode;
  dispatch: React.Dispatch<VideoUserAction>;
  videoUserState: VideoUserState;
}

const trackpubsToTracks = (
  trackMap: Map<string, RemoteAudioTrackPublication | RemoteVideoTrackPublication>,
) =>
  Array.from(trackMap.values())
    .map(publication => publication.track)
    .filter(track => track !== null);

export const VideoWrapper = (props: Props) => {
  const { channelName, userId } = useShallowEqualSelector((state: RootState) => ({
    channelName: state.room.pin,
    userId: state.user.id,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    const init = async (name: string) => {
      if (!name) return;
      const tracks = await createLocalTracks();
      const tokenReponse = await roomService.getToken(channelName);

      const token = tokenReponse.data.token;

      const room = await connect(token, {
        name,
        tracks,
      });

      props.dispatch({
        type: VideoUserActionAction.ADD_ROOM,
        room,
      });

      const audioTrack = tracks.find(track => track.kind === "audio");
      const videoTrack = tracks.find(track => track.kind === "video");

      const uid = room.localParticipant.identity;

      props.dispatch({
        type: VideoUserActionAction.ADD_USER,
        payload: {
          uid,
          audioTrack,
          videoTrack,
        },
        participant: room.localParticipant,
      });

      const participantConnected = (participant: RemoteParticipant) => {
        const participantAudioTrack = head(
          trackpubsToTracks(participant.audioTracks),
        ) as RemoteAudioTrack;
        const participantVideoTrack = head(
          trackpubsToTracks(participant.videoTracks),
        ) as RemoteVideoTrack;

        const participantUID = participant.identity;

        props.dispatch({
          type: VideoUserActionAction.ADD_USER,
          payload: {
            uid: participantUID,
            audioTrack: participantAudioTrack,
            videoTrack: participantVideoTrack,
          },
          participant,
        });

        const onUnsubscribed = (track: LocalVideoTrackPublication) => {
          const newTrack = track.track || track;
          if (track.kind === "video") {
            props.dispatch({
              type: VideoUserActionAction.REMOVE_VIDEO,
              payload: {
                uid: participantUID,
                videoTrack: newTrack,
              },
            });
          } else if (track.kind === "audio") {
            props.dispatch({
              type: VideoUserActionAction.REMOVE_AUDIO,
              payload: {
                uid: participantUID,
                audioTrack: newTrack,
              },
            });
          }
        };

        const onSubscribe = (track: LocalVideoTrackPublication) => {
          const newTrack = track.track || track;
          if (track.kind === "video") {
            props.dispatch({
              type: VideoUserActionAction.ADD_VIDEO,
              payload: {
                uid: participantUID,
                videoTrack: newTrack,
              },
            });
          } else if (track.kind === "audio") {
            props.dispatch({
              type: VideoUserActionAction.ADD_AUDIO,
              payload: {
                uid: participantUID,
                audioTrack: newTrack,
              },
            });
          }
        };

        participant.on("trackSubscribed", onSubscribe);

        participant.on("trackEnabled", onSubscribe);

        participant.on("trackDisabled", onUnsubscribed);
      };

      room.participants.forEach(participantConnected);

      room.on("participantConnected", participantConnected);

      room.on("participantDisconnected", participant => {
        const participantUID = participant.identity;
        props.dispatch({
          type: VideoUserActionAction.REMOVE_USER,
          payload: {
            uid: participantUID,
          },
        });
      });

      dispatch(setUID(uid));
    };

    if (channelName && userId) {
      init(channelName);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelName]);

  useEffect(() => {
    const listener = () => {
      window.addEventListener("online", () => {
        window.location.reload();
      });
    };
    window.addEventListener("offline", listener);

    return () => {
      props.dispatch({
        type: VideoUserActionAction.REMOVE_ROOM,
      });

      window.removeEventListener("offline", listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {props.children}
      <Audios videoUserState={props.videoUserState} />
    </>
  );
};
