import { ShowUserInStoryTime } from "components";
import { ItsYourTurnWrapper } from "hoc";
import { neverHaveIEverService } from "services/never-have-i-ever.service";

const nextStep = (roomPin: string) => {
  neverHaveIEverService.changeStoryTimeUser(roomPin);
};

export const StoryTime = () => {
  return (
    <ItsYourTurnWrapper>
      <ShowUserInStoryTime nextStep={nextStep} questionPrefix={""} questionSuffix={""} />
    </ItsYourTurnWrapper>
  );
};
