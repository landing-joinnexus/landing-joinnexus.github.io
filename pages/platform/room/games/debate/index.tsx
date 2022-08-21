import { useSelector } from "react-redux";
import { RootState } from "store";
import { Instructions } from "./instructions";
import { ShowQuestions } from "./show-questions";
import { StoryTime } from "./story-time";

export const DebateGame = () => {
  const step = useSelector((state: RootState) => state.room?.gameState?.step);

  switch (step) {
    case 1:
      return <ShowQuestions />;
    case 2:
      return <StoryTime />;
    default:
      return <Instructions />;
  }
};
