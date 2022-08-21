import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { useUserIsHost } from "hooks/use-user-is-host";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { startGame } from "utils";

const NextButton = () => {
  const { t } = useTranslation();
  const { gameId, roomPin, hostUsername } = useShallowEqualSelector(
    (state: RootState) => ({
      gameId: state.room.gameId,
      roomPin: state.room.pin,
      hostUsername: state.room.hostUsername,
    }),
  );

  const isHost = useUserIsHost();

  let label = `${t("common.waiting_for")} ${hostUsername} ${t("common.to_continue")}`;

  if (isHost) {
    label = t("common.continue");
  }

  return (
    <GameButton
      isDisabled={!isHost}
      backgroundImage={GalacticColors.BLUE}
      label={label}
      style={{ fontSize: "15px", padding: "5px" }}
      onClick={startGame(gameId as number, roomPin as string)}
    />
  );
};

export default NextButton;
