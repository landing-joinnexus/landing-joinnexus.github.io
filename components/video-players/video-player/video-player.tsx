import NoAudioIcon from "assets/icons/platform/mic_off.svg";
import { Video } from "components/video";
import { VideoUserConsumer, VideoUserState } from "contexts";
import { get } from "lodash";
import { OnClickUser, UserDetail } from "models";
import { formatUsername } from "utils";
import { getPlayerContainerStyles } from "../utils/get-player-container-styles";
import Styles from "./video-player.module.css";

interface Props {
  onClick?: OnClickUser;
  userId: number;
  usersDetails: Record<string, UserDetail>;
  highlightUsers: Array<number>;
  className?: string;
  videoUserState?: VideoUserState;
}

const InternalVideoPlayer = (props: Props) => {
  const { userId, usersDetails, highlightUsers, className } = props;

  const userName = usersDetails[userId]?.name;
  const userNameFormatted = formatUsername(userName);

  const playerContainerStyle = getPlayerContainerStyles(props.onClick);

  const onClickUser: OnClickUser = props.onClick as OnClickUser;
  const onClick = () => (onClickUser ? onClickUser(userId as number) : null);

  const noAudioIcon = !get(props, `videoUserState.audio.${userId}.isEnabled`) ? (
    <img data-testid="no-audio" alt="no audio" src={NoAudioIcon} />
  ) : null;

  const classes = [Styles.videoPlayer, className];

  if (highlightUsers && highlightUsers.includes(Number(userId))) {
    classes.push(Styles.selected);
  }

  return (
    <div data-testid="video-player" style={playerContainerStyle} key={userId} onClick={onClick}>
      <Video className={classes.join(" ")} userId={userId} />
      <h3 className={`${Styles.playerName}`}>
        <label>{userNameFormatted}</label> {noAudioIcon}
      </h3>
    </div>
  );
};

export const VideoPlayer = (props: Props) => {
  return (
    <VideoUserConsumer>
      {consumer => {
        return (
          <>
            <InternalVideoPlayer
              {...props}
              videoUserState={(consumer as { state: VideoUserState }).state}
            />
          </>
        );
      }}
    </VideoUserConsumer>
  );
};
