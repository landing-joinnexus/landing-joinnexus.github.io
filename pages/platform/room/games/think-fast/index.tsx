import { ScoreTable } from "components/score-table";
import { RootState, useShallowEqualSelector } from "store";
import { BreakTime } from "./break-time";
import { Instructions } from "./instructions";
import { SayWord } from "./say-word";

export const ThinkFastGame = () => {
  const { step } = useShallowEqualSelector((state: RootState) => ({
    step: state.room?.gameState?.step,
  }));

  switch (step) {
    case 1:
      return <SayWord />;
    case 2:
      return <BreakTime />;
    case 3:
      return (
        <ScoreTable orderBy="asc" />
      );
    default:
      return <Instructions />;
  }
};
