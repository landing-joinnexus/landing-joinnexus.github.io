import { useSelector } from "react-redux";
import { RootState } from "store";
import Instructions from "./instructions/instructions";
import ShowQuestion from "./show-question/show-question";
import StoryTime from "./story-time/story-time";

export const MostLikelyToGame = () => {
  const step = useSelector((state: RootState) => state.room?.gameState?.step);
  switch (step) {
    case 1:
      return <ShowQuestion />;
    case 2:
      return <StoryTime />;
    default:
      return <Instructions />;
  }
};
