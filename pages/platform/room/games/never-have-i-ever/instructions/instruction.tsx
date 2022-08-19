import { GameInstructions } from "components/game-instructions";
import { times } from "lodash";
import { useTranslation } from "react-i18next";

const Instructions = () => {
  const { t } = useTranslation();
  return (
    <GameInstructions slider="stars" maxFails={10} gameName={t("games.never_have_i_ever")}>
      <p className="instructions-paragraph">{t("instructions.never_have_i_ever.paragraph1")}</p>
      <ol className="instructions-paragraph">
        {times(5).map((_value, index) => (
          <li key={index}>{t(`instructions.never_have_i_ever.paragraph${index + 2}`)}</li>
        ))}
      </ol>
      <p className="instructions-paragraph">{t("instructions.never_have_i_ever.paragraph7")}</p>
    </GameInstructions>
  );
};

export default Instructions;
