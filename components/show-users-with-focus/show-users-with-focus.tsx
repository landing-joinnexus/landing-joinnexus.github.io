import HostTitle from "components/host-title/host-title";
import ReactionsComponent from "components/reactions-component";
import { Video } from "components/video";
import VideoPlayers from "components/video-players/video-players";
import { StoryTimeUserWrapper } from "hoc";
import { useStoryUserIsTheSameUserInSession } from "hooks/story-user-is-the-same-user-in-session";
import hash from "object-hash";
import { useMemo } from "react";
import { RootState, useShallowEqualSelector } from "store";
import Styles from "./show-users-with-focus.module.css";
import { UserVideo } from "./user-video/user-video";
import { videoStyle } from "./user-video/user-video.style";

interface Props {
  highlightUsers?: Array<number>;
  displayReaction?: boolean;
}

const ShowUsersWithFocus = (props: Props) => {
  const { userForStoryTime, usersHash, hostUserId, userId } = useShallowEqualSelector(
    (state: RootState) => ({
      userForStoryTime: state.room.gameState?.userForStoryTime,
      usersHash: state.video.usersHash,
      hostUserId: state.room.hostUserId,
      userId: state.user.id,
    }),
  );

  const storyUserIsTheSameUserInSession = useStoryUserIsTheSameUserInSession();
  const highlightUsers = hash(props.highlightUsers || {});

  const dependencies = [
    userForStoryTime,
    usersHash,
    storyUserIsTheSameUserInSession,
    highlightUsers,
  ];

  return useMemo(() => {
    let video;
    if (storyUserIsTheSameUserInSession) {
      video = (
        <StoryTimeUserWrapper userId={String(userId)}>
          <Video
            className={Styles.videoPlayer}
            style={{ ...videoStyle, margin: "auto" }}
            userId={String(userId)}
          />
        </StoryTimeUserWrapper>
      );
    } else {
      video = <UserVideo userId={String(userForStoryTime)} />;
    }

    const reactionComponent = props.displayReaction ? (
      <ReactionsComponent displayReactionCounter={true} />
    ) : null;

    return (
      <>
        <div className={`centerContent ${Styles.container}`}>
          <div>
            <HostTitle show={hostUserId === userForStoryTime} userId={Number(userForStoryTime)} />
            {video}
          </div>
          {reactionComponent}
        </div>
        <VideoPlayers
          highlightUsers={props.highlightUsers}
          omitUserids={[userForStoryTime as number]}
        />
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default ShowUsersWithFocus;
