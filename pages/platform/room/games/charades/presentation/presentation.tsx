import NeonBox from "components/neon-box/neon-box";
import ShowUsersWithFocus from "components/show-users-with-focus/show-users-with-focus";
import { ItsYourTurnWrapper } from "hoc";
import BottomSection from "./bottom-section/bottom-section";
import PresentationMessage from "./presentation-message/presentation-message";

export const Presentation = () => {
  return (
    <ItsYourTurnWrapper>
      <NeonBox>
        <PresentationMessage />
      </NeonBox>
      <ShowUsersWithFocus />
      <BottomSection />
    </ItsYourTurnWrapper>
  );
};

export default Presentation;
