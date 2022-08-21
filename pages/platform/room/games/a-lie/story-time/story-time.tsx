import NeonBox from "components/neon-box/neon-box";
import ShowUsersWithFocus from "components/show-users-with-focus/show-users-with-focus";
import { ItsYourTurnWrapper } from "hoc";
import { useStoryUserIsTheSameUserInSession } from "hooks/story-user-is-the-same-user-in-session";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { getUserNameFormatted } from "utils";
import BottomSection from "./bottom-section/bottom-section";
import Styles from './story-time.module.css';

const gamePrefix = "a_lie";

const StoryTime = () => {
  const { t } = useTranslation();
  const { userForStoryTime, usersDetails } = useShallowEqualSelector((state: RootState) => ({
    userForStoryTime: state.room.gameState?.userForStoryTime,
    usersDetails: state.room.usersDetails,
  }));
  const storyUserIsTheSameUserInSession = useStoryUserIsTheSameUserInSession();

  const userNameFormatted = getUserNameFormatted(usersDetails, userForStoryTime as number);
  const messageInNeonBox = storyUserIsTheSameUserInSession
    ? t(`${gamePrefix}.you_have_to_tell_to_the_other_players_two_truths_and_a_lie`)
    : `${userNameFormatted} ${t(`${gamePrefix}.is_going_to_tell_us_two_truths_and_a_lie`)}`;

  return (
    <ItsYourTurnWrapper>
      <NeonBox className={Styles.neonBox}>
        <h2 className="text">{messageInNeonBox}</h2>
      </NeonBox>
      <div className={Styles.storyTimeContainer}>
        <ShowUsersWithFocus />
      </div>
      <BottomSection />
    </ItsYourTurnWrapper>
  );
};

export default StoryTime;
