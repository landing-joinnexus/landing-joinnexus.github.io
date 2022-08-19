import { VideoUserState } from "contexts";
import { get, keys } from "lodash";
import { RootState, useShallowEqualSelector } from "store";
import { Audio } from "./audio";
import Styles from "./index.module.css";

interface Props {
  videoUserState: VideoUserState;
}

export const Audios = (props: Props) => {
  const { videoUserState } = props;

  const { userId } = useShallowEqualSelector((state: RootState) => ({
    userId: state.user.id,
  }));

  const hasAudioTracksAvailable = videoUserState?.room && videoUserState?.audio;
  if (!hasAudioTracksAvailable) {
    return null;
  }

  return (
    <div className={Styles.audiosContainer}>
      {keys(videoUserState?.audio).map(audioUserId => {
        const shouldPlayAudio =
          get(videoUserState, `audio.${audioUserId}.isEnabled`) &&
          String(userId) !== String(audioUserId);
        if (!shouldPlayAudio) {
          return null;
        }
        return <Audio key={audioUserId} audioTrack={videoUserState?.audio[audioUserId]} />;
      })}
    </div>
  );
};
