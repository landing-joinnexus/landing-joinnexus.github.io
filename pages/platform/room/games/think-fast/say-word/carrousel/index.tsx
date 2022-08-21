import HostTitle from "components/host-title/host-title";
import { Video } from "components/video";
import { VideoPlayer } from "components/video-players/video-player/video-player";
import { UserInformationWrapper } from "hoc";
import { compact, uniq } from "lodash";
import { RootState, useShallowEqualSelector } from "store";
import Styles from "./index.module.css";

export const Carrousel = () => {
  const { userForStoryTime, usersIdsOrder, currentUserId, usersDetails, hostUserId } =
    useShallowEqualSelector((state: RootState) => ({
      userForStoryTime: state.room.gameState?.userForStoryTime,
      usersIdsOrder: state.room.usersIdsOrder,
      currentUserId: state.user.id,
      usersDetails: state.room.usersDetails,
      hostUserId: state.room.hostUserId,
    }));

  const currentIndex = usersIdsOrder.findIndex(e => e === userForStoryTime) as number;
  const lastIndex = usersIdsOrder.length - 1;
  const nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
  const prevIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;

  const currentUser = usersIdsOrder[currentIndex];
  const prevUser = usersIdsOrder[prevIndex];
  const nextUser = usersIdsOrder[nextIndex];

  const usersToShow = compact(uniq([prevUser, currentUser, nextUser]));

  const videosPlayers = usersToShow.map((userId: number) => {
    const classNames = [Styles.fitMaxLayout, Styles.player];
    const containerClassNames = [];
    if (String(userId) === String(userForStoryTime)) {
      classNames.push(Styles.storyTimeUser);
    } else {
      classNames.push(Styles.notStoryTimeUser);
      containerClassNames.push(Styles.notStoryTimeUserContainer);
    }

    const containerClassName = containerClassNames.join(" ");

    const className = classNames.join(" ");
    if (String(userId) === String(currentUserId)) {
      return (
        <div className={containerClassName} key={userId}>
          <UserInformationWrapper>
            <Video userId={userId} className={className} key={userId} />
          </UserInformationWrapper>
        </div>
      );
    }

    return (
      <div className={containerClassName} key={userId}>
        <HostTitle show={hostUserId === userId} userId={userId} />
        <VideoPlayer
          className={className}
          userId={userId}
          highlightUsers={[]}
          usersDetails={usersDetails}
        />
      </div>
    );
  });

  return <div className={Styles.container}>{videosPlayers}</div>;
};
