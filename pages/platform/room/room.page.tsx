import { CircularProgress } from "@mui/material";
import ChangeLanguageButton from "components/change-language-button";
import VideoPlayer from "components/video-player/video-player";
import VideoPlayers from "components/video-players/video-players";
import { FullscreenWallpaper, GameWrapper, GoToFeedButtonWrapper } from "hoc";
import { Room } from "models";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { roomService } from "services/room.service";
import { RootState, useShallowEqualSelector } from "store";
import { setRoomState } from "store/room.store";
import { GameID, goToFeed } from "utils";
import {
  ALieGame,
  CharadesGame,
  DebateGame,
  DeepQuestionsGame,
  HypotethicallyGame,
  MostLikelyToGame,
  NeverHaveIEverGame,
  ThinkFastGame,
  TriviaGame,
  WhoAmIGame,
} from "./games";
import GamesList from "./games-list/games-list";
import RoomTitle from "./room-title/room-title";
import { RoomWrappers } from "./room-wrappers";
import Styles from "./room.page.module.css";

const RoomPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { gameId, hostUsername, backgroundImage } = useShallowEqualSelector((state: RootState) => ({
    hostUsername: state.room.hostUsername,
    gameId: state.room.gameId,
    backgroundImage: state.room.backgroundImage,
  }));

  const { pin } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const response = await roomService.findRoomByPin(pin);
        const room: Room = response.data;
        dispatch(setRoomState(room));
      } catch (e) {
        goToFeed(navigate);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(() => {
    let content = null;
    switch (gameId) {
      case GameID.NEVER_HAVE_I_EVER:
        content = <NeverHaveIEverGame />;
        break;
      case GameID.THINK_FAST:
        content = <ThinkFastGame />;
        break;
      case GameID.MOST_LIKELY_TO:
        content = <MostLikelyToGame />;
        break;
      case GameID.A_LIE:
        content = <ALieGame />;
        break;
      case GameID.CHARADES:
        content = <CharadesGame />;
        break;
      case GameID.HYPOTETHICALLY:
        content = <HypotethicallyGame />;
        break;
      case GameID.DEBATE:
        content = <DebateGame />;
        break;
      case GameID.WHO_AM_I:
        content = <WhoAmIGame />;
        break;
      case GameID.DEEP_QUESTIONS:
        content = <DeepQuestionsGame />;
        break;
      case GameID.TRIVIA:
        content = <TriviaGame />;
        break;
      default:
        content = (
          <>
            <RoomTitle />
            <GamesList />
            <VideoPlayers />
          </>
        );
    }

    if (gameId) {
      content = <GameWrapper>{content}</GameWrapper>;
    }

    let goToFeedButton = null;

    if (!gameId) {
      goToFeedButton = <GoToFeedButtonWrapper />;
    }

    if (!hostUsername) {
      content = <CircularProgress />;
    }

    return (
      <RoomWrappers>
        <FullscreenWallpaper
          backgroundImage={backgroundImage as string}
          isContentHorizontallyCentered={true}
          isContentVerticallyCentered={!gameId}
        >
          {goToFeedButton}
          <section className={Styles.content}>
            {content}
            <VideoPlayer />
          </section>
          <ChangeLanguageButton />
        </FullscreenWallpaper>
      </RoomWrappers>
    );
  }, [gameId, backgroundImage, hostUsername]);
};

export default RoomPage;
