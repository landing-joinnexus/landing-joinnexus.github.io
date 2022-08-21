import { Clock } from "components/clock";
import NeonBox from "components/neon-box/neon-box";
import ShowUsersWithFocus from "components/show-users-with-focus/show-users-with-focus";
import { keys } from "lodash";
import { charadesService } from "services/charades.service";
import { RootState, useShallowEqualSelector } from "store";
import { BottomSection } from "./bottom-section";
import Instructions from "./instructions/instructions";

export const GuessWord = () => {
  const { votes } = useShallowEqualSelector((state: RootState) => ({
    votes: state.room.gameState?.votes,
  }));

  const highlightUsers = keys(votes).map(userId => Number(userId));

  return (
    <>
      <NeonBox>
        <Instructions />
      </NeonBox>
      <ShowUsersWithFocus highlightUsers={highlightUsers} />
      <br />
      <BottomSection />
      <Clock nextStep={charadesService.showResults} />
    </>
  );
};

export default GuessWord;
