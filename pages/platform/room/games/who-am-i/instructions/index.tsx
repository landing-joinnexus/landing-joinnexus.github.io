import { GameInstructions } from "components/game-instructions";
import { times } from "lodash";
import { useTranslation } from "react-i18next";

export const Instructions = () => {
  const { t } = useTranslation();
  return (
    <GameInstructions maxFails={10} gameName={t("games.who_am_i")}>
      {times(5).map((_value, index) => (
        <p key={index} className="instructions-paragraph">
          {t(`instructions.who_am_i.paragraph${index + 1}`)}
        </p>
      ))}
    </GameInstructions>
  );
};
