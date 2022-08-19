import BackIcon from "assets/icons/platform/back.svg";
import { GameButton } from "components";
import { backButtonStyle } from "components/game-instructions/index.style";
import GameTitle from "components/game-title/game-title";
import { GalacticColors } from "enums/galactic-backgrounds";
import { useUserIsHost } from "hooks/use-user-is-host";
import { sanitizeLanguage } from "lang/i18";
import { Game } from "models";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { gameService } from "services/game.service";
import { RootState, useShallowEqualSelector } from "store";
import Styles from "./index.module.css";
import { getGameWithCategories } from "./utils/get-game-with-categories";
import { goToHomeRoom } from "./utils/go-to-home-room";

interface Props {
  children?: React.ReactNode;
}

export const GameWrapper = (props: Props) => {
  const { gameId, games, currentGame, pin } = useShallowEqualSelector((state: RootState) => ({
    gameId: state.room.gameId,
    games: state.game.games,
    currentGame: state.game.game,
    pin: state.room.pin,
  }));
  const { t, i18n } = useTranslation();
  const currentLanguage = sanitizeLanguage(i18n.language);
  const gameName = currentGame?.gameLanguages.find(gl => gl.languageId === currentLanguage);
  const isHost = useUserIsHost();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!gameId) return;

    let game = games.find(_game => _game.id === gameId);

    if (game) {
      (async () => {
        await getGameWithCategories(game as Game, dispatch);
      })();
    } else {
      (async () => {
        const response = await gameService.findGameWithDetails(gameId);
        game = response.data;
        await getGameWithCategories(game as Game, dispatch);
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  return (
    <>
      <div className={Styles.backButton}>
        <GameButton
          onClick={goToHomeRoom(pin as string)}
          style={backButtonStyle}
          backgroundImage={GalacticColors.BLUE}
          imageSrc={BackIcon}
          tooltip={`${t("common.go_back")}`}
          isDisabled={!isHost}
        />
      </div>
      <section>
        <GameTitle gameName={gameName?.label as string} />
        <section>{props.children}</section>
      </section>
    </>
  );
};
