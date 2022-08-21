import { RefObject } from "react";
import IntroductionBackground from "assets/backgrounds/section_1_wallpaper.webp";
import { Introduction } from "./introduction";
import { Header } from "./header";
import { Trailer } from "./trailer";
import Styles from "./index.module.css";

interface ISectionRef {
  section6Ref: RefObject<HTMLDivElement>;
}

export const Section1 = ({ section6Ref }: ISectionRef) => {
  return (
    <section
      data-testid="register-early-access-section"
      className={`fitWallpaper ${Styles.container}`}
      style={{ background: `url(${IntroductionBackground})` }}
    >
      <Header />
      <div className={`${Styles.content} row`}>
        <Introduction resultRef={section6Ref} />
        <Trailer />
      </div>
    </section>
  );
};
