import NoAudioIcon from "assets/icons/platform/mic_off.svg";
import { VideoUserConsumer, VideoUserState } from "contexts";
import { get } from "lodash";
import { RootState, useShallowEqualSelector } from "store";
import { getUserNameFormatted } from "utils";

interface Props {
  userId: string;
  children?: React.ReactNode;
  videoUserState?: VideoUserState;
}

const InternalStoryTimeUserWrapper = (props: Props) => {
  const { userForStoryTime, usersDetails } = useShallowEqualSelector(
    (state: RootState) => ({
      userForStoryTime: state.room.gameState?.userForStoryTime,
      usersDetails: state.room.usersDetails,
    }),
  );
  
  const {children, videoUserState, userId} = props;
  const userNameFormatted = getUserNameFormatted(usersDetails, userForStoryTime as number);

  const noAudioIcon = get(videoUserState, `audio.${userId}`) ? null : (
    <img data-testid="no-audio" alt="no audio" src={NoAudioIcon} />
  );

  return (
    <>
      {children}
      <h3 className="neon">
        {userNameFormatted} {noAudioIcon}
      </h3>
    </>
  );
}

export const StoryTimeUserWrapper = (props: Props) => {
  return (
    <VideoUserConsumer>
      {consumer => {
        return (
          <>
            <InternalStoryTimeUserWrapper
              {...props}
              videoUserState={(consumer as { state: VideoUserState }).state}
            />
          </>
        );
      }}
    </VideoUserConsumer>
  );
}