import { ShowUserInStoryTime } from "components";
import { ItsYourTurnWrapper } from "hoc";
import { useTranslation } from "react-i18next";
import { deepQuestionsService } from "services";

const nextStep = (roomPin: string) => {
  deepQuestionsService.changeStoryTimeUser(roomPin);
};

const StoryTime = () => {
  const { t } = useTranslation();
  return (
    <ItsYourTurnWrapper>
      <ShowUserInStoryTime
        nextStep={nextStep}
        questionPrefix={""}
        questionSuffix={""}
        storyTimePrefix={t("deep_questions.storyTimePrefix")}
        storyTimeSuffix={t("deep_questions.storyTimeSuffix")}
        reactionComponent={true}
        underline={'yellow'} 
      />
    </ItsYourTurnWrapper>
  );
};

export default StoryTime;
