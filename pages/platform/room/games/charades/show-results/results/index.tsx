import { keys } from "lodash";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { getQuestion } from "utils";
import Styles from "./index.module.css";

export const Results = () => {
  const { votes, usersDetails, questionLanguages } = useShallowEqualSelector(
    (state: RootState) => ({
      votes: state.room.gameState?.votes,
      usersDetails: state.room.usersDetails,
      questionLanguages: state.room.gameState?.question?.questionLanguages,
    }),
  );
  const { t, i18n } = useTranslation();
  const winners = keys(votes);

  const word = getQuestion(questionLanguages, i18n);

  if (!winners.length) {
    return (
      <>
        <h3 className="text">{t("charades.nobody_guessed_the_word")}</h3>
        <h2 className="text neon">{word}</h2>
      </>
    );
  }

  const winnersNames = winners.map(w => usersDetails[w].name).join(", ");

  return (
    <>
      <h3 className="subtitle">{t("common.winners")}</h3>
      <div className={`${Styles.table} text`}>
        <div>{t("common.winners")}</div>
        <div>{winnersNames}</div>
      </div>
      <div className={Styles.wordContainer}>
        <label className="subtitle text underline">
          {t("charades.secret_word_was")} {word}
        </label>
      </div>
    </>
  );
};
