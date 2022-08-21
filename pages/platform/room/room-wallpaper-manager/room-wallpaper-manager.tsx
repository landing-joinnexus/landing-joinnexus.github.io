import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setBackgroundImage } from "store/room.store";

interface Props {
  children?: React.ReactNode;
}

const prefix = `${process.env.PUBLIC_URL}/assets/backgrounds`;

const RoomWallpaperManager = (props: Props) => {
  const dispatch = useDispatch();
  const gameId = useSelector((state: RootState) => state.room.gameId);
  useEffect(() => {
    if (gameId) {
      dispatch(setBackgroundImage(`${prefix}/game_${gameId}.webp`))
    } else {
      dispatch(setBackgroundImage(`${prefix}/main_background.webp`))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);
  return (
    <>
      {props.children}
    </>
  );
}

export default RoomWallpaperManager;
