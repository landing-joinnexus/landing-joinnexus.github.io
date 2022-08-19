import NoVideoPlayer from "components/video/no-video-player/no-video-player";
import { VideoUserConsumer, VideoUserState } from "contexts";
import { get } from "lodash";
import { CSSProperties, useEffect, useRef } from "react";
import Styles from "./index.module.css";

interface Props {
  className: string;
  style?: CSSProperties;
  userId: string | number;
  videoUserState?: VideoUserState;
}

const InternalVideo = (props: Props) => {
  const {videoUserState, userId, className, style} = props;
  const videoRef = useRef(null);
  const videoTrack = get(videoUserState, `video.${userId}`);
  const isPlaying = videoTrack && get(videoTrack, 'isEnabled');
  useEffect(() => {
    if (videoTrack && videoRef.current) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTrack, isPlaying]);

  if (!isPlaying) {
    return <NoVideoPlayer className={className} style={style} />;
  }

  return (
    <div>
      <video
        className={`${className} ${Styles.videoPlayer}`}
        style={style}
        ref={videoRef}
        autoPlay={true}
      />
    </div>
  );
};

export const Video = (props: Props) => {
  return (
    <VideoUserConsumer>
      {consumer => {
        return (
          <>
            <InternalVideo
              {...props}
              videoUserState={(consumer as { state: VideoUserState }).state}
            />
          </>
        );
      }}
    </VideoUserConsumer>
  );
};
