import NeonBox from "components/neon-box/neon-box";
import NextButton from "components/next-button/next-button";
import VideoPlayers from "components/video-players/video-players";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { neonBoxStyle } from "styles/neonbox-style";
import { getQuestion } from "utils";
import { Results } from "./results";

export const ShowResults = () => {
  const { i18n } = useTranslation();
  const { questionLanguages } = useShallowEqualSelector((state: RootState) => ({
    questionLanguages: state.room.gameState?.question?.questionLanguages,
  }));

  const question = getQuestion(questionLanguages, i18n);

  return (
    <>
      <NeonBox style={neonBoxStyle}>
        <h2 className="text">{question}</h2>
      </NeonBox>
      <VideoPlayers />
      <Results />
      <NextButton />
    </>
  );
};
