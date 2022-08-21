import { Action, Dispatch } from "@reduxjs/toolkit";
import { GameBanner } from "components";
import { sanitizeLanguage } from "lang/i18";
import { Game } from "models";
import { setBackgroundImage } from "store/room.store";
import { openGame } from "../utils/open-game";
import Styles from './index.module.css';

const backgroundPrefix = `${process.env.PUBLIC_URL}/assets/backgrounds`;
const defaultBackgroundImageUrl = `${backgroundPrefix}/main_background.webp`;

export const renderGame =
  (isHostUser: boolean, roomPin: string, language: string, dispatch: Dispatch<Action<unknown>>) =>
    (game: Game) => {
      const key = `game_banner_${game.id}`;

      const currentLanguage = sanitizeLanguage(language);

      const gameTitle = game?.gameLanguages?.find(gl => gl.languageId === currentLanguage)?.label;

      const backgroundImageUrl = `${backgroundPrefix}/game_${game.id}.webp`;

    return (
      <div
        key={key}
        onMouseLeave={() => dispatch(setBackgroundImage(defaultBackgroundImageUrl))}
        onMouseEnter={() => dispatch(setBackgroundImage(backgroundImageUrl))}
        onClick={openGame(isHostUser, roomPin, game.id)}
        className={Styles.division}
      >
        <GameBanner gameId={game.id} background={backgroundImageUrl} name={gameTitle as string} />
      </div>
    );
  };