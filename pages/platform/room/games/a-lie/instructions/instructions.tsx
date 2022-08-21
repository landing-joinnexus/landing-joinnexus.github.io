
import { GameInstructions } from "components/game-instructions";
import { useTranslation } from "react-i18next";

export const Instructions = () => {
  const { t } = useTranslation();
  return (
    <GameInstructions gameName={t("games.a_lie")} hideCategories={true}>
      <p className="instructions-paragraph">{t(`instructions.a_lie.paragraph1`)}</p>
      <p className="instructions-paragraph">{t(`instructions.a_lie.paragraph2`)}</p>
      <p className="instructions-paragraph">{t(`instructions.a_lie.paragraph3`)}</p>
      <ul className="instructions-paragraph" style={{ paddingLeft: '0px' }}>
        <ol>
          <b className="neon">{t('a_lie.storyteller')}: </b> {t('instructions.a_lie.paragraph4')}
        </ol>
        <ol>
          <b className="neon">{t('a_lie.listener')}: </b> {t('instructions.a_lie.paragraph5')}
        </ol>
      </ul>
      <p className="instructions-paragraph">{t(`instructions.a_lie.paragraph6`)}</p>
      <p className="instructions-paragraph">{t(`instructions.a_lie.paragraph7`)}</p>
    </GameInstructions>
  );
};
