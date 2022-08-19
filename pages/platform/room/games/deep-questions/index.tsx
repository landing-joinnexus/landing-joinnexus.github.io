import { useSelector } from "react-redux";
import { RootState } from "store";
import Instructions from "./instructions/instruction";
import StoryTime from "./story-time/story-time";

export const DeepQuestionsGame = () => {
  const step = useSelector((state: RootState) => state.room?.gameState?.step);
  switch (step) {
    case 1:
      return <StoryTime />;
    default:
      return <Instructions />;
  }
};
