import { Video } from "components/video";
import { VideoUserConsumer, VideoUserState } from "contexts";
import { StoryTimeUserWrapper } from "hoc";
import { compact, values } from "lodash";
import Styles from "./user-video.module.css";
import { videoStyle } from "./user-video.style";

interface Props {
  userId: string;
  videoUserState?: VideoUserState;
}

const InternalUserVideo = (props: Props) => {
  const { userId, videoUserState } = props;

  const storyUserStyle = { ...videoStyle };

  const usersWithVideo = compact(values(videoUserState?.video));

  if (usersWithVideo.length > 1) {
    storyUserStyle.height = "25vh";
  }

  return (
    <StoryTimeUserWrapper userId={userId}>
      <Video className={Styles.videoPlayer} style={storyUserStyle} userId={userId} />
    </StoryTimeUserWrapper>
  );
};

export const UserVideo = (props: Props) => {
  return (
    <VideoUserConsumer>
      {consumer => {
        return (
          <>
            <InternalUserVideo
              {...props}
              videoUserState={(consumer as { state: VideoUserState }).state}
            />
          </>
        );
      }}
    </VideoUserConsumer>
  );
};
