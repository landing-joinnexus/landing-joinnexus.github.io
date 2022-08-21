import { ScoreTable } from "components";
import { useSelector } from "react-redux";
import { RootState } from "store";
import Instructions from "./instructions/instruction";
import ShowQuestion from "./show-question/show-question";
import { ShowResults } from "./show-results";
import { StoryTime } from "./story-time";

export const NeverHaveIEverGame = () => {
  const step = useSelector((state: RootState) => state.room?.gameState?.step);
  switch (step) {
    case 1:
      return <ShowQuestion />;
    case 2:
      return <ShowResults />;
    case 3:
      return <StoryTime />;
    case 4:
      return <ScoreTable orderBy="desc" />;
    default:
      return <Instructions />;
  }
};
