import { GameInstructions } from "components/game-instructions";
import { times } from "lodash";
import { useTranslation } from "react-i18next";

const Instructions = () => {
  const { t } = useTranslation();
  return (
    <GameInstructions gameName={t("games.deep_questions")}>
      {times(6).map((_value, index) => (
        <p className="instructions-paragraph" key={index}>{t(`instructions.deep_questions.paragraph${index + 1}`)}</p>
      ))}
    </GameInstructions>
  );
};

export default Instructions;
