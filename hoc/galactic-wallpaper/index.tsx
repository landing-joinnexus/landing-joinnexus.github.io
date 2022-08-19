import { FullscreenWallpaper } from "hoc";
import GalacticBackground from "assets/backgrounds/galactic.webp";
import { omit } from "lodash";

interface Props {
  children?: React.ReactNode;
  isContentVerticallyCentered?: boolean;
  isContentHorizontallyCentered?: boolean;
}

export const GalacticWallpaper = (props: Props) => (
  <FullscreenWallpaper backgroundImage={GalacticBackground} {...omit(props, "children")}>
    {props.children}
  </FullscreenWallpaper>
);
