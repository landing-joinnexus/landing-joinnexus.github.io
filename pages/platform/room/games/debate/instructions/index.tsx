import { GameInstructions } from "components/game-instructions";
import { times } from "lodash";
import { useTranslation } from "react-i18next";

export const Instructions = () => {
  const { t } = useTranslation();
  return (
    <GameInstructions gameName={t("games.debate")}>
      {times(5).map((_value, index) => (
        <p key={index} className="instructions-paragraph">
          {t(`instructions.debate.paragraph${index + 1}`)}
        </p>
      ))}
    </GameInstructions>
  );
}
