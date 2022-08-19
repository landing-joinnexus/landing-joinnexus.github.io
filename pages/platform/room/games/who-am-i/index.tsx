import { ScoreTable } from "components/score-table";
import { RootState, useShallowEqualSelector } from "store";
import { Instructions } from "./instructions";
import { Presentation } from "./presentation";
import { Summary } from "./summary";

export const WhoAmIGame = () => {
  const { step } = useShallowEqualSelector((state: RootState) => ({
    step: state.room?.gameState?.step,
  }));

  switch (step) {
    case 1:
      return <Presentation />;
    case 2:
      return <Summary />;
    case 3:
      return <ScoreTable orderBy="asc" />;
    default:
      return <Instructions />;
  }
};
