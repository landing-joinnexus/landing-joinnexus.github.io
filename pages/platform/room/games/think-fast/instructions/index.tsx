import { GameInstructions } from "components/game-instructions";
import { times } from "lodash";
import { useTranslation } from "react-i18next";

export const Instructions = () => {
  const { t } = useTranslation();
  return (
    <GameInstructions maxFails={10} gameName={t("games.think_fast")}>
      {times(5).map((_value, index) => (
        <p key={index} className="instructions-paragraph">
          {t(`instructions.think_fast.paragraph${index + 1}`)}
        </p>
      ))}
    </GameInstructions>
  );
};
