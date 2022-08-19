import { GameInstructions } from "components/game-instructions";
import { times } from "lodash";
import { useTranslation } from "react-i18next";

const Instructions = () => {
  const { t } = useTranslation();
  return (
    <GameInstructions minPlayersAmount={3} gameName={t("games.most_likely_to")}>
      <p className="instructions-paragraph">{t("instructions.most_likely_to.paragraph1")}</p>
      <ol className="instructions-paragraph">
        {times(5).map((_value, index) => (
          <li key={index}>{t(`instructions.most_likely_to.paragraph${index + 2}`)}</li>
        ))}
      </ol>
      <p className="instructions-paragraph">{t("instructions.most_likely_to.paragraph7")}</p>
    </GameInstructions>
  );
};

export default Instructions;
