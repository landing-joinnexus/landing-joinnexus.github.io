import { GameButton } from "components";
import NeonBox from "components/neon-box/neon-box";
import VideoPlayers from "components/video-players/video-players";
import { GalacticColors } from "enums/galactic-backgrounds";
import { useUserIsHost } from "hooks/use-user-is-host";
import { values } from "lodash";
import { useTranslation } from "react-i18next";
import { neverHaveIEverService } from "services/never-have-i-ever.service";
import { RootState, useShallowEqualSelector } from "store";
import { formatUsername, startGame } from "utils";
import { Results } from "./results";

const startStoryTime = (hasPositiveAnswers: boolean, roomPin: string) => () => {
  if (hasPositiveAnswers) {
    neverHaveIEverService.changeStoryTimeUser(roomPin);
  } else {
    startGame(1, roomPin)();
  }
};

export const ShowResults = () => {
  const { t } = useTranslation();

  const { roomPin, hostUsername, votes, options } = useShallowEqualSelector(
    (rootState: RootState) => ({
      roomPin: rootState.room.pin,
      hostUsername: rootState.room.hostUsername,
      votes: rootState.room?.gameState?.votes,
      options: rootState.room.gameState?.question?.options,
    }),
  );

  const isHostUser = useUserIsHost();

  let label = t("common.continue");

  if (!isHostUser) {
    label = `${t("common.waiting_for")} ${formatUsername(hostUsername)} ${t("common.to_continue")}`;
  }

  const positiveOption = options?.find(option => option.isPositive);
  const hasPositiveAnswers = values(votes).includes(positiveOption?.id);

  return (
    <>
      <VideoPlayers />
      <NeonBox>
        <h2 className="subtitle">{t("common.voting_results")}</h2>
        <Results />
      </NeonBox>
      <div>
        <GameButton
          onClick={startStoryTime(hasPositiveAnswers, roomPin as string)}
          backgroundImage={GalacticColors.BLUE}
          label={label}
          isDisabled={!isHostUser}
        />
      </div>
    </>
  );
};
