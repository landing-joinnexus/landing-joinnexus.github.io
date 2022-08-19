import Stars3Background from "assets/backgrounds/section_7_wallpaper.webp";
import { forwardRef } from "react";
import { ContactForm } from "./contact-form";
import Styles from "./index.module.css";

export const Section7 = forwardRef((props, ref) => (
  <div
    className={`fitWallpaper ${Styles.container}`}
    style={{ background: `url(${Stars3Background})` }}
    ref={ref as React.RefObject<HTMLDivElement>}
  >
    <ContactForm></ContactForm>
  </div>
));
