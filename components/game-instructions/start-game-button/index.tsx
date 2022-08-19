import { RainbowButton } from "components";
import { useUserIsHost } from "hooks/use-user-is-host";
import { keys, size } from "lodash";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { formatUsername, startGame } from "utils";

interface Props {
  hideCategories?: boolean;
  maxCounter?: number;
  minPlayersAmount?: number;
}

const StartGameButton = (props: Props) => {
  const { gameId, roomPin, hostUsername, categoriesSelected, usersDetails } =
    useShallowEqualSelector((state: RootState) => ({
      gameId: state.room.gameId,
      roomPin: state.room.pin,
      hostUsername: state.room.hostUsername,
      categoriesSelected: state.room.categories,
      usersDetails: state.room.usersDetails,
    }));
  const { maxCounter, hideCategories, minPlayersAmount } = props;
  const { t } = useTranslation();
  const isHostUser = useUserIsHost();

  let label = t("common.lets_start_the_game");

  let isDisabled = !isHostUser;

  if (!hideCategories) {
    isDisabled = isDisabled || !size(categoriesSelected);
  }

  if (isDisabled) {
    label = isHostUser
      ? t("common.select_at_least_1_category")
      : `${t("common.waiting_for")} ${formatUsername(hostUsername)} ${t(
          "common.to_start_the_game",
        )}`;
  }

  const playersAmount = keys(usersDetails);

  const hasEnoughPlayersAmount = playersAmount.length >= (minPlayersAmount || 0);

  if (!hasEnoughPlayersAmount && !!minPlayersAmount) {
    isDisabled = true;
    const remainPlayers = (minPlayersAmount || 0) - playersAmount.length;

    label = `${t("common.you_need")} ${remainPlayers} `;
    label += remainPlayers === 1 ? t("common.more_player") : t("common.more_players");
  }

  return (
    <RainbowButton
      label={label}
      onClick={startGame(gameId as number, roomPin as string, maxCounter)}
      isDisabled={isDisabled}
    />
  );
};

export default StartGameButton;