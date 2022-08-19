import ChangeLanguageButton from "components/change-language-button";
import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { GalacticWallpaper } from "hoc";
import { useTranslation } from "react-i18next";
import { getBrowser } from "utils";
import Styles from "./permissions-issues.module.css";

const PermissionsIssues = () => {
  const { t } = useTranslation();
  const browser = getBrowser();

  const src = `/assets/permissions-issues/${browser}.jpg`;

  return (
    <GalacticWallpaper isContentHorizontallyCentered={true} isContentVerticallyCentered={true}>
      <div className={Styles.container}>
        <h2 className="neon">{t("common.please_allow_us_to_access_your_camera_and_microphone")}</h2>
        <img className={Styles.instructions} alt="instructions" src={src} />
        <GameButton
          dataTestId="reload-button"
          onClick={() => window.location.reload()}
          backgroundImage={GalacticColors.BLUE}
          label={t("common.retry")}
        />
      </div>
      <ChangeLanguageButton />
    </GalacticWallpaper>
  );
};

export default PermissionsIssues;
