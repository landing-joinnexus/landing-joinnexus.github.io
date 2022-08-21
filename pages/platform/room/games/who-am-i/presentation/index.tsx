import { Clock } from "components/clock";
import ShowUsersWithFocus from "components/show-users-with-focus/show-users-with-focus";
import { ItsYourTurnWrapper } from "hoc";
import { useTranslation } from "react-i18next";
import { whoAmIService } from "services";
import { BottomSection } from "./bottom-section";
import { Character } from "./character";
import { Clue } from "./clue";

export const Presentation = () => {
  const { t } = useTranslation();
  return (
    <ItsYourTurnWrapper customMessage={t('who_am_i.its_your_turn')}>
      <Character />
      <br />
      <ShowUsersWithFocus />
      <BottomSection />
      <Clock nextStep={whoAmIService.showResults} />
      <Clue />
    </ItsYourTurnWrapper>
  );
};
