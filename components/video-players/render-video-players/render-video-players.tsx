import HostTitle from "components/host-title/host-title";
import { Video } from "components/video";
import { UserInformationWrapper } from "hoc";
import { compact, size } from "lodash";
import { OnClickUser, UserDetail } from "models";
import { RootState, useShallowEqualSelector } from "store";
import { VideoPlayer } from "../video-player/video-player";
import Styles from "./render-video-players.module.css";
import {
  horizontalVideoPlayersContainer,
  verticalVideoPlayersContainer,
} from "./render-video-players.style";

interface Props {
  isVertical: boolean;
  currentUserId: number;
  omitUserids: Array<number>;
  onClick: OnClickUser;
  usersIdsOrder: Array<number>;
  highlightUsers: Array<number>;
  usersDetails: Record<string, UserDetail>;
  hideUser?: boolean;
  fitMaxLayout?: boolean;
}

const RenderVideoPlayers = (props: Props) => {
  const {
    usersIdsOrder,
    isVertical,
    highlightUsers,
    usersDetails,
    currentUserId,
    omitUserids,
    hideUser,
  } = props;

  const { hostUserId } = useShallowEqualSelector((state: RootState) => ({
    hostUserId: state.room.hostUserId,
  }));

  let containerStyle = isVertical ? verticalVideoPlayersContainer : horizontalVideoPlayersContainer;

  const usersToOmit = [...(omitUserids || []).map(id => String(id))];

  if (hideUser) {
    usersToOmit.push(String(currentUserId));
  }

  const otherUserIds = usersIdsOrder.filter(id => !usersToOmit.includes(String(id)));

  let stylesVideo: string | undefined = size(compact(usersToOmit)) ? Styles.videoMin : Styles.video;
  const containerClass = props.fitMaxLayout ? Styles.fitMaxLayout : undefined;

  if (props.fitMaxLayout) {
    stylesVideo = undefined;
    const userLength = size(otherUserIds);
    let repeat = userLength;
    switch (userLength) {
      case 1:
        repeat = 1;
        break;
      case 2:
        repeat = 2;
        break;
      default:
        repeat = 3;
        break;
    }

    const fixHeight = repeat === 1 ? "350px" : "250px";

    containerStyle = {
      gridTemplateColumns: `repeat(${repeat}, 1fr)`,
      gap: "10px",
      overflow: "scroll",
      maxHeight: `calc(100vh - ${fixHeight})`,
    };
  }
  const videosPlayers = otherUserIds.map((userId: number) => {
    if (String(userId) === String(currentUserId)) {
      return (
        <div key={userId}>
          <UserInformationWrapper>
            <Video className={stylesVideo as string} userId={userId} />
          </UserInformationWrapper>
        </div>
      );
    }

    return (
      <div key={userId}>
        <HostTitle show={hostUserId === userId} userId={userId} />
        <VideoPlayer
          highlightUsers={highlightUsers}
          onClick={props.onClick}
          userId={userId}
          usersDetails={usersDetails}
          className={stylesVideo}
        />
      </div>
    );
  });

  return (
    <div data-testid="video-players" className={containerClass} style={containerStyle}>
      {videosPlayers}
    </div>
  );
};

export default RenderVideoPlayers;
