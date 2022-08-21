import NeonBox from "components/neon-box/neon-box";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { renderOption } from "./render-option";
import Styles from "./index.module.css";

export const Results = () => {
  const { t } = useTranslation();

  const { votes, usersDetails, options } = useShallowEqualSelector((rootState: RootState) => ({
    usersDetails: rootState.room.usersDetails,
    votes: rootState.room?.gameState?.votes,
    options: rootState.room?.gameState?.question?.options,
  }));

  return (
    <NeonBox>
      <h2 className="subtitle">{t("common.results")}</h2>
      <div className={Styles.table}>
        {options?.map(renderOption(usersDetails, votes as Record<number, string>))}
      </div>
    </NeonBox>
  );
};
