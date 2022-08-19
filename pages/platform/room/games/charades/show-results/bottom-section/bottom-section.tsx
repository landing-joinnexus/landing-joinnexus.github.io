import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { useUserIsHost } from "hooks/use-user-is-host";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { formatUsername, GameID, startGame } from "utils";

const BottomSection = () => {
  const { t } = useTranslation();
  const { roomPin, hostUsername } = useShallowEqualSelector((state: RootState) => ({
    roomPin: state.room.pin,
    hostUsername: state.room.hostUsername,
  }));

  const isHost = useUserIsHost();

  const label = isHost
    ? t("common.continue")
    : `${t("common.waiting_for")} ${formatUsername(hostUsername)} ${t("common.to_continue")}`;

  return (
    <>
      <GameButton
        onClick={startGame(GameID.CHARADES, roomPin as string)}
        backgroundImage={GalacticColors.BLUE}
        label={label}
        isDisabled={!isHost}
      />
    </>
  );
};

export default BottomSection;
