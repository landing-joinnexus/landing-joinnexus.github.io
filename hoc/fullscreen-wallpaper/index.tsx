import { CSSProperties } from "react";
import Styles from "./index.module.css";

interface Props {
  children?: React.ReactNode;
  backgroundImage: string;
  isContentVerticallyCentered?: boolean;
  isContentHorizontallyCentered?: boolean;
}

export const FullscreenWallpaper = (props: Props) => {
  const style: CSSProperties = {
    backgroundImage: `url(${props.backgroundImage})`,
  };
  if (props.isContentVerticallyCentered) {
    style.display = "flex";
    style.alignItems = "center";
  }
  if (props.isContentHorizontallyCentered) {
    style.display = "flex";
    style.justifyContent = "center";
  }
  return (
    <div
      data-testid="fullscreen-wallpaper"
      style={style}
      className={`${Styles.fullScreen} fitWallpaper`}
    >
      {props.children}
    </div>
  );
};
