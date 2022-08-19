import { GameInstructions } from "components/game-instructions";
import { times } from "lodash";
import { useTranslation } from "react-i18next";

export const Instructions = () => {
  const { t } = useTranslation();
  return (
    <GameInstructions slider="stars" gameName={t("games.trivia")} maxFails={10}>
      <ol className="instructions-paragraph">
        {times(5).map((_value, index) => (
          <p key={index}>{t(`instructions.trivia.paragraph${index + 1}`)}</p>
        ))}
      </ol>
    </GameInstructions>
  );
};
