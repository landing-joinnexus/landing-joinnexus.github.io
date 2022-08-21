import { useStoryUserIsTheSameUserInSession } from "hooks/story-user-is-the-same-user-in-session";
import { get, head } from "lodash";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { capitalizeEach, getQuestion } from "utils";
import Styles from "./index.module.css";
import IncognitoImage from "assets/images/incognito.webp";

export const Character = () => {
  const { i18n } = useTranslation();

  const { imageUrl, questionLanguages } = useShallowEqualSelector((state: RootState) => ({
    imageUrl: get(head(state.room.gameState?.question?.questionImages), "url"),
    questionLanguages: state.room.gameState?.question?.questionLanguages,
  }));

  const question = getQuestion(questionLanguages, i18n);

  const isStoryTimeUser = useStoryUserIsTheSameUserInSession();

  return (
    <>
      <img className={Styles.image} src={isStoryTimeUser ? IncognitoImage : imageUrl} alt="" />
      {isStoryTimeUser ? null : <p className={Styles.answer}>{capitalizeEach(question)}</p>}
    </>
  );
};
