import Styles from "./index.module.css";
import PlanetBackground from "assets/backgrounds/section_3_wallpaper.webp";
import { Audience } from "./audience";
import { Carousel } from "./carousel";

export const Section3 = () => {
  return (
    <div
      className={`${Styles.container} fitWallpaper`}
      style={{ background: `url(${PlanetBackground})` }}
    >
      <div data-testid="message" className={`centerContent ${Styles.leftContainer}`}>
        <Audience></Audience>
      </div>
      <div data-testid="mockup" className={`centerContent ${Styles.rightContainer}`}>
        <Carousel />
      </div>
    </div>
  );
};
