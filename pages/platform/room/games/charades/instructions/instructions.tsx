import { GameInstructions } from "components/game-instructions";
import { times } from "lodash";
import { useTranslation } from "react-i18next";

const Instructions = () => {
  const { t } = useTranslation();
  return (
    <GameInstructions gameName={t("games.charades")}>
      <p className="instructions-paragraph">{t(`instructions.charades.paragraph1`)}</p>
      <ol className="instructions-paragraph">
        {times(3).map((_value, index) => (
          <li key={index}>{t(`instructions.charades.paragraph${index + 2}`)}</li>
        ))}
      </ol>
      <p className="instructions-paragraph">{t(`instructions.charades.paragraph5`)}</p>
    </GameInstructions>
  );
};

export default Instructions;
