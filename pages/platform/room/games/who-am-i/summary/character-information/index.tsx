import NeonBox from "components/neon-box/neon-box";
import { get, head } from "lodash";
import { useTranslation } from "react-i18next";
import { useShallowEqualSelector, RootState } from "store";
import { getQuestion, getDescription, capitalizeEach } from "utils";
import Styles from './index.module.css';

export const CharacterInformation = () => {
  const { i18n } = useTranslation();

  const { imageUrl, questionLanguages, questionImageDescriptions } = useShallowEqualSelector(
    (state: RootState) => ({
      imageUrl: get(head(state.room.gameState?.question?.questionImages), "url"),
      questionImageDescriptions: get(
        head(state.room.gameState?.question?.questionImages),
        "questionImageDescriptions",
      ),
      questionLanguages: state.room.gameState?.question?.questionLanguages,
    }),
  );

  const question = getQuestion(questionLanguages, i18n);
  const description = getDescription(questionImageDescriptions, i18n);

  return (
    <NeonBox>
      <div className={Styles.summaryContainer}>
        <div className="center">
          <img src={imageUrl} alt="" />
        </div>
        <div>
          <h2 className={`${Styles.answer} subtitle`}>{capitalizeEach(question)}</h2>
          <p className={Styles.description}>{description}</p>
        </div>
      </div>
    </NeonBox>
  );
};
