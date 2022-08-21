import { size } from "lodash";
import { OnClickUser } from "models";
import hash from "object-hash";
import { useMemo } from "react";
import { RootState, useShallowEqualSelector } from "store";
import RenderVideoPlayers from "./render-video-players/render-video-players";
import Styles from "./video-players.module.css";

interface Props {
  omitUserids?: Array<number>;
  width?: string;
  isVertical?: boolean;
  onClick?: OnClickUser;
  highlightUsers?: Array<number>;
  hideUser?: boolean;
  fitMaxLayout?: boolean;
}

const VideoPlayers = (props: Props) => {
  const { usersDetails, usersIdsOrder, currentUserId, usersHash } = useShallowEqualSelector(
    (state: RootState) => ({
      usersDetails: state.room.usersDetails,
      usersIdsOrder: state.room.usersIdsOrder,
      currentUserId: state.user.id,
      usersHash: state.video.usersHash,
    }),
  );

  const highlightUsers = hash(props.highlightUsers || {});
  const omitUsersHash = hash(props.omitUserids || {});

  const dependencies = [usersHash, usersIdsOrder, omitUsersHash, highlightUsers];

  return useMemo(() => {
    let videoPlayers = null;
    if (size(usersIdsOrder)) {
      videoPlayers = (
        <RenderVideoPlayers
          currentUserId={currentUserId as number}
          highlightUsers={props.highlightUsers as Array<number>}
          isVertical={props.isVertical as boolean}
          omitUserids={props.omitUserids as Array<number>}
          onClick={props.onClick as OnClickUser}
          usersDetails={usersDetails}
          usersIdsOrder={usersIdsOrder}
          hideUser={props.hideUser}
          fitMaxLayout={props.fitMaxLayout}
        />
      );
    }
    return (
      <div className={Styles.container} style={{ width: props.width, margin: "auto" }}>
        {videoPlayers}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export default VideoPlayers;
