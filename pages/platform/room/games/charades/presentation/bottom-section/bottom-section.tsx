import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { useStoryUserIsTheSameUserInSession } from "hooks/story-user-is-the-same-user-in-session";
import { useTranslation } from "react-i18next";
import { charadesService } from "services/charades.service";
import { RootState, useShallowEqualSelector } from "store";
import { getUserNameFormatted } from "utils";

const BottomSection = () => {
  const { t } = useTranslation();
  const { userForStoryTime, usersDetails, roomPin } = useShallowEqualSelector(
    (state: RootState) => ({
      userForStoryTime: state.room.gameState?.userForStoryTime,
      usersDetails: state.room.usersDetails,
      roomPin: state.room.pin,
    }),
  );

  const storyUserIsTheSameUserInSession = useStoryUserIsTheSameUserInSession();
  const userNameFormatted = getUserNameFormatted(usersDetails, userForStoryTime as number);

  let label = `${t("common.waiting_for")} ${userNameFormatted} ${t("common.to_continue")}`;

  if (storyUserIsTheSameUserInSession) {
    label = `${t("common.lets_start")}`;
  }

  return (
    <GameButton
      onClick={() => charadesService.startActOutTime(roomPin as string)}
      backgroundImage={GalacticColors.BLUE}
      label={label}
      isDisabled={!storyUserIsTheSameUserInSession}
    />
  );
};

export default BottomSection;
