import { ToggleButton, Tooltip } from "@mui/material";
import MicOffIcon from "assets/icons/platform/mic_off.svg";
import MicOnIcon from "assets/icons/platform/mic_on.svg";
import {
  VideoUserAction,
  VideoUserActionAction,
  VideoUserConsumer,
  VideoUserState,
} from "contexts";
import { get } from "lodash";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";

interface Props {
  dispatch: React.Dispatch<VideoUserAction>;
  videoUserState: VideoUserState;
}

const InternalAudioControl = (props: Props) => {
  const { t } = useTranslation();
  const { userId } = useShallowEqualSelector((state: RootState) => ({
    userId: state.user.id,
  }));
  const { videoUserState, dispatch } = props;

  const user = get(videoUserState, `participants.${userId}`);

  if (!user) return null;

  const hasAudio = !!get(videoUserState, `audio.${userId}`);

  const audioIcon = hasAudio ? MicOnIcon : MicOffIcon;

  const title = hasAudio ? "mute" : "unmute";

  const changeAudio = () => {
    const type = hasAudio
      ? VideoUserActionAction.MUTE_AUDIO_USER
      : VideoUserActionAction.UNMUTE_AUDIO_USER;
    dispatch({
      type,
      payload: {
        uid: String(userId),
      },
    });
  };

  return (
    <ToggleButton onClick={changeAudio} value="audio">
      <Tooltip title={t(`controls.${title}`) as string}>
        <img alt="audio" src={audioIcon} />
      </Tooltip>
    </ToggleButton>
  );
};

export const AudioControl = () => {
  return (
    <VideoUserConsumer>
      {consumer => {
        return (
          <>
            <InternalAudioControl
              videoUserState={(consumer as { state: VideoUserState }).state}
              dispatch={(consumer as { dispatch: React.Dispatch<VideoUserAction> }).dispatch}
            />
          </>
        );
      }}
    </VideoUserConsumer>
  );
};
