import { sanitizeLanguage } from "lang/i18";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { renderOption } from "./render-option";
import Styles from "./index.module.css";

export const Results = () => {
  const { i18n } = useTranslation();

  const { options, usersDetails, votes } = useShallowEqualSelector((rootState: RootState) => ({
    options: rootState.room.gameState?.question?.options,
    usersDetails: rootState.room.usersDetails,
    votes: rootState.room?.gameState?.votes,
  }));

  const currentLanguage = sanitizeLanguage(i18n.language);

  return (
    <div className={Styles.table}>
      {options?.map(renderOption(currentLanguage, usersDetails, votes as Record<number, number>))}
    </div>
  );
};
