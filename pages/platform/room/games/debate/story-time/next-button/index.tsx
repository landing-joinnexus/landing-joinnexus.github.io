import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { useUserIsHost } from "hooks/use-user-is-host";
import { useTranslation } from "react-i18next";
import { useShallowEqualSelector, RootState } from "store";
import { formatUsername, GameID, startGame } from "utils";

export const NextButton = () => {
  const { t } = useTranslation();
  const isHostUser = useUserIsHost();
  let label = t("common.continue");
  const { roomPin, hostUsername } = useShallowEqualSelector((state: RootState) => ({
    roomPin: state.room.pin,
    hostUsername: state.room.hostUsername,
  }));

  if (!isHostUser) {
    label = `${t("common.waiting_for")} ${formatUsername(hostUsername)} ${t("common.to_continue")}`;
  }

  return (
    <GameButton
      onClick={startGame(GameID.DEBATE, roomPin as string)}
      backgroundImage={GalacticColors.BLUE}
      label={label}
      isDisabled={!isHostUser}
    />
  );
};
