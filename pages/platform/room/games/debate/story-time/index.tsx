import VideoPlayers from "components/video-players/video-players";
import { useShallowEqualSelector, RootState } from "store";
import { Question } from "../components/question";
import { DebatePlayers } from "./debate-players";
import { NextButton } from "./next-button";

export const StoryTime = () => {
  const { usersForStoryTime } = useShallowEqualSelector((state: RootState) => ({
    usersForStoryTime: state.room.gameState?.usersForStoryTime || [],
  }));

  const hasTheSameAnswer = !usersForStoryTime[0] || !usersForStoryTime[1];

  const videoPlayers = hasTheSameAnswer ? null : <VideoPlayers omitUserids={usersForStoryTime} />;

  return (
    <>
      <Question hasTheSameAnswer={hasTheSameAnswer} />
      <DebatePlayers hasTheSameAnswer={hasTheSameAnswer} />
      {videoPlayers}
      <NextButton />
    </>
  );
};
