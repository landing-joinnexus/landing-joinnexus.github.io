import { ScoreTable } from "components/score-table";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { Instructions } from "./instructions";
import ShowQuestion from "./show-question";
import { ShowResults } from "./show-results";

export const TriviaGame = () => {
  const step = useSelector((state: RootState) => state.room?.gameState?.step);
  switch (step) {
    case 1:
      return <ShowQuestion />;
    case 2:
      return <ShowResults />;
    case 3:
      return <ScoreTable orderBy="desc" />;
    default:
      return <Instructions />;
  }
};
