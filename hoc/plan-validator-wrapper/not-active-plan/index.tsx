import { GameButton } from "components";
import NeonBox from "components/neon-box/neon-box";
import { GalacticColors } from "enums/galactic-backgrounds";
import { GalacticWallpaper } from "hoc";
import { useTranslation } from "react-i18next";

export const NotActivePlan = () => {
  const { t } = useTranslation();
  return (
    <GalacticWallpaper isContentHorizontallyCentered={true} isContentVerticallyCentered={true}>
      <NeonBox className="center">
        <h1 className="neon">{t("room.ask_to_your_manager")}</h1>
        <GameButton
          onClick={() => window.location.reload()}
          backgroundImage={GalacticColors.BLUE}
          label={t("room.try_again")}
        />
      </NeonBox>
    </GalacticWallpaper>
  );
};
