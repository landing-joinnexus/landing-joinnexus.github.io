import { ShowUserInStoryTime } from "components";
import { ItsYourTurnWrapper } from "hoc";
import { useTranslation } from "react-i18next";
import { hypotethicallyService } from "services/hypotethically.service";

const nextStep = (roomPin: string) => {
  hypotethicallyService.changeStoryTimeUser(roomPin);
};

const StoryTime = () => {
  const { t } = useTranslation();
  return (
    <ItsYourTurnWrapper>
      <ShowUserInStoryTime
        nextStep={nextStep}
        questionPrefix={""}
        questionSuffix={""}
        storyTimePrefix={t("hypotethically.storyTimePrefix")}
        storyTimeSuffix={t("hypotethically.storyTimeSuffix")}
        reactionComponent={true}
        underline={'yellow'} 
      />
    </ItsYourTurnWrapper>
  );
};

export default StoryTime;
