import { GameButton } from "components";
import NeonBox from "components/neon-box/neon-box";
import VideoPlayers from "components/video-players/video-players";
import { GalacticColors } from "enums/galactic-backgrounds";
import { useUserIsHost } from "hooks/use-user-is-host";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import { formatUsername } from "utils";

interface Props {
  startStoryTime: (roomPin: string) => void;
}

const PrepareStoryTime = (props: Props) => {
  const { t } = useTranslation();

  const { roomPin, hostUsername } = useShallowEqualSelector(
    (state: RootState) => ({
      roomPin: state.room.pin,
      hostUsername: state.room.hostUsername,
    }),
  );

  const isHostUser = useUserIsHost();
  let label = t("common.continue");

  if (!isHostUser) {
    label = `${t("common.waiting_for")} ${formatUsername(hostUsername)} ${t(
      "story_time.to_start_story_time",
    )}`;
  }

  return (
    <>
      <VideoPlayers />
      <NeonBox>
        <h2 className="neon">{t("story_time.story_time_instructions")}</h2>
      </NeonBox>
      <div>
        <GameButton
          onClick={() => props.startStoryTime(roomPin as string)}
          backgroundImage={GalacticColors.BLUE}
          label={label}
          isDisabled={!isHostUser}
        />
      </div>
    </>
  );
};

export default PrepareStoryTime;
