import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { useTranslation } from "react-i18next";
import { debateService } from "services/debate.service";
import { useShallowEqualSelector, RootState } from "store";

export const GameOptions = () => {
  const { t } = useTranslation();

  const { userId, roomPin } = useShallowEqualSelector((state: RootState) => ({
    userId: state.user.id,
    roomPin: state.room.pin,
  }));

  return (
    <div>
      <GameButton
        onClick={() => debateService.saveVote(roomPin as string, 1, userId as number)}
        backgroundImage={GalacticColors.BLUE}
        label={t("debate.agree")}
      />
      <GameButton
        onClick={() => debateService.saveVote(roomPin as string, 2, userId as number)}
        backgroundImage={GalacticColors.RED}
        label={t("debate.disagree")}
      />
    </div>
  );
};
