import { ShowUserInStoryTime } from "components";
import { ItsYourTurnWrapper } from "hoc";
import { useTranslation } from "react-i18next";
import { mostLikelyToService } from "services/most-likely-to.service";

const nextStep = (roomPin: string) => {
  mostLikelyToService.changeStoryTimeUser(roomPin);
};

const StoryTime = () => {
  const { t } = useTranslation();

  return (
    <ItsYourTurnWrapper>
      <ShowUserInStoryTime
        nextStep={nextStep}
        questionPrefix={t("most_likely_to.question_prefix")}
        questionSuffix={"?"}
        storyTimePrefix="most_likely_to.storyTimePrefix"
        storyTimeSuffix="most_likely_to.storyTimeSuffix"
      />
    </ItsYourTurnWrapper>
  );
};

export default StoryTime;
