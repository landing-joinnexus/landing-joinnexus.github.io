import NeonBox from "components/neon-box/neon-box";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { options } from "../../tools/options";
import Styles from './index.module.css';
import { renderOption } from "./render-option";

const Results = () => {
  const { t } = useTranslation();

  const { votes, usersDetails, storytimeUserId } = useShallowEqualSelector(
    (rootState: RootState) => ({
      usersDetails: rootState.room.usersDetails,
      votes: rootState.room?.gameState?.votes,
      storytimeUserId: rootState.room.gameState?.userForStoryTime,
    }),
  );

  let goodOption = null;

  if (votes) {
    goodOption = votes[Number(storytimeUserId)];
  }

  return (
    <NeonBox>
      <h2 className="subtitle">{t("common.results")}</h2>
      <div className={Styles.table}>
        {options
          ?.map(option => `a_lie.${option}`)
          ?.map(renderOption(goodOption, usersDetails, votes as Record<number, string>))}
      </div>
    </NeonBox>
  );
};

export default Results;
