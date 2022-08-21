import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { useStoryUserIsTheSameUserInSession } from "hooks/story-user-is-the-same-user-in-session";
import { useTranslation } from "react-i18next";
import { thinkFastService } from "services/think-fast.service";
import { RootState, useShallowEqualSelector } from "store";
import { getUserNameFormatted } from "utils";

export const NextButton = () => {
  const { t } = useTranslation();
  const isStoryTimeUser = useStoryUserIsTheSameUserInSession();
  const { usersDetails, userForStoryTime, roomPin } = useShallowEqualSelector(
    (state: RootState) => ({
      usersDetails: state.room.usersDetails,
      userForStoryTime: state.room.gameState?.userForStoryTime,
      roomPin: state.room.pin,
    }),
  );

  const userName = getUserNameFormatted(usersDetails, userForStoryTime as number);
  let label = t("think_fast.i_already_said_the_word");

  if (!isStoryTimeUser) {
    label = `${t("common.waiting_for")} ${userName} ${t(
      "common.to_continue",
    )}`;
  }

  return (
    <GameButton
      backgroundImage={GalacticColors.BLUE}
      label={label}
      isDisabled={!isStoryTimeUser}
      onClick={() => thinkFastService.nextPlayer(roomPin as string)}
    />
  );
};
