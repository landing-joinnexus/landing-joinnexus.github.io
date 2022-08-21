import { ToggleButton, Tooltip } from "@mui/material";
import VideoOffIcon from "assets/icons/platform/video_off.svg";
import VideoOnIcon from "assets/icons/platform/video_on.svg";
import { VideoUserAction, VideoUserActionAction, VideoUserConsumer, VideoUserState } from "contexts";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";

interface Props {
  dispatch: React.Dispatch<VideoUserAction>;
  videoUserState: VideoUserState;
}

const InternalVideoControl = (props: Props) => {
  const { t } = useTranslation();
  const { userId } = useShallowEqualSelector((state: RootState) => ({
    userId: state.user.id,
  }));
  const { videoUserState, dispatch } = props;

  const user = get(videoUserState, `participants.${userId}`);

  if (!user) return null;

  const hasVideo = !!get(videoUserState, `video.${userId}`);

  const videoIcon = hasVideo ? VideoOnIcon : VideoOffIcon;
  const title = hasVideo ? "turn_off_camera" : "turn_on_camera";

  const changeVideo = () => {
    const type = hasVideo
      ? VideoUserActionAction.MUTE_VIDEO_USER
      : VideoUserActionAction.UNMUTE_VIDEO_USER;
    dispatch({
      type,
      payload: {
        uid: String(userId),
      },
    });
  };

  return (
    <ToggleButton onClick={changeVideo} value="video">
      <Tooltip title={t(`controls.${title}`) as string}>
        <img alt="video" src={videoIcon} />
      </Tooltip>
    </ToggleButton>
  );
};

export const VideoControl = () => {
  return (
    <VideoUserConsumer>
      {consumer => {
        return (
          <>
            <InternalVideoControl
              videoUserState={(consumer as { state: VideoUserState }).state}
              dispatch={(consumer as { dispatch: React.Dispatch<VideoUserAction> }).dispatch}
            />
          </>
        );
      }}
    </VideoUserConsumer>
  );
};
