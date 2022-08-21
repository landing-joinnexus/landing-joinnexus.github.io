import { useSelector } from "react-redux";
import { RootState } from "store";
import { Instructions } from "./instructions/instructions";
import ShowResults from "./show-results/show-results";
import StoryTime from "./story-time/story-time";

export const ALieGame = () => {
  const step = useSelector((state: RootState) => state.room?.gameState?.step);
  switch (step) {
    case 1:
      return <StoryTime />;
    case 2:
      return <ShowResults />;
    default:
      return <Instructions />;
  }
};
