import { GameInstructions } from "components/game-instructions";
import { times } from "lodash";
import { useTranslation } from "react-i18next";

const Instructions = () => {
  const { t } = useTranslation();
  return (
    <GameInstructions gameName={t("games.hypotethically")}>
      <p className="instructions-paragraph">{t("instructions.hypotethically.paragraph1")}</p>
      <ol className="instructions-paragraph">
        {times(2).map((_value, index) => (
          <li key={index}>{t(`instructions.hypotethically.paragraph${index + 2}`)}</li>
        ))}
      </ol>
      <p className="instructions-paragraph">{t("instructions.hypotethically.paragraph4")}</p>
    </GameInstructions>
  );
};

export default Instructions;
