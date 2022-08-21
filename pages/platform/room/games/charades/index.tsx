import { useSelector } from "react-redux";
import { RootState } from "store";
import ShowResults from "./show-results/show-results";
import GuessWord from "./guess-word/guess-word";
import Instructions from "./instructions/instructions";
import Presentation from "./presentation/presentation";

export const CharadesGame = () => {
  const step = useSelector((state: RootState) => state.room?.gameState?.step);
  switch (step) {
    case 1:
      return <Presentation />;
    case 2:
      return <GuessWord />;
    case 3:
      return <ShowResults />;
    default:
      return <Instructions />;
  }
};
