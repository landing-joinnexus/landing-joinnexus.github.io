import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { useStoryUserIsTheSameUserInSession } from "hooks/story-user-is-the-same-user-in-session";
import { useTranslation } from "react-i18next";
import { thinkFastService } from "services/think-fast.service";
import { RootState, useShallowEqualSelector } from "store";
import { GameID, getUserNameFormatted, startGame } from "utils";

export const NextButton = () => {
  const { t } = useTranslation();
  const isStoryTimeUser = useStoryUserIsTheSameUserInSession();
  const { usersDetails, userForStoryTime, roomPin, maxCounter, counter } = useShallowEqualSelector(
    (state: RootState) => ({
      usersDetails: state.room.usersDetails,
      userForStoryTime: state.room.gameState?.userForStoryTime,
      roomPin: state.room.pin,
      maxCounter: state.room.gameState?.maxCounter,
      counter: state.room.gameState?.counter as Record<number, number>,
    }),
  );

  const userName = getUserNameFormatted(usersDetails, userForStoryTime as number);
  const currentCounter = counter[userForStoryTime as number];

  let label = t("common.continue");
  let onClick = startGame(GameID.THINK_FAST, roomPin as string, maxCounter);

  if (currentCounter === maxCounter) {
    label = t("common.show_results");
    onClick = () => thinkFastService.showResults(roomPin as string);
  }

  if (!isStoryTimeUser) {
    label = `${t("common.waiting_for")} ${userName} ${t("common.to_continue")}`;
  }

  return (
    <GameButton
      onClick={onClick}
      label={label}
      backgroundImage={GalacticColors.BLUE}
      isDisabled={!isStoryTimeUser}
    />
  );
};
