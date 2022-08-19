import { CircularProgress } from "@mui/material";
import { useUserIsHost } from "hooks/use-user-is-host";
import { size } from "lodash";
import { Game } from "models";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { gameService } from "services/game.service";
import { RootState, useShallowEqualSelector } from "store";
import { setGames } from "store/game.store";
import { renderGame } from "./render-game";
import Styles from "./games-list.module.css";

const GamesList = () => {
  const {
    i18n: { language },
  } = useTranslation();

  const dispatch = useDispatch();

  const { games, pin } = useShallowEqualSelector((state: RootState) => ({
    games: state.game.games,
    pin: state.room.pin,
  }));

  const isHostUser = useUserIsHost();

  useEffect(() => {
    (async () => {
      if (!size(games)) {
        const response = await gameService.findGamesWithDetails();
        const gameList: Array<Game> = response.data;
        dispatch(setGames(gameList));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!size(games)) {
    return <CircularProgress />;
  }

  return (
    <div className={`${Styles.list} neonScroll noHorizontalScroll`}>
      {(games || []).map(renderGame(isHostUser, pin as string, language, dispatch))}
    </div>
  );
};

export default GamesList;
