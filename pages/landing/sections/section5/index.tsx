import { Features } from "./features";
import Styles from "./index.module.css";
import { useTranslation } from "react-i18next";
import PlanetBackground from "assets/backgrounds/section_3_wallpaper.webp";

export const Section5 = () => {
  const { t } = useTranslation();
  return (
    <div className={`${Styles.container} fitWallpaper`} style={{ background: `url(${PlanetBackground})` }}>
      <div data-testid="message">
        <div className={`maxWidth100vw`}>
          <div className={`${Styles.title}`}>
            {t("landing.all_the_best_features")}
          </div>
          <Features></Features>
        </div>
      </div>
    </div>
  );
};
