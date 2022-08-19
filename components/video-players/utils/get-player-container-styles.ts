import { CSSProperties } from "react";
import { OnClickUser } from "models";

export const getPlayerContainerStyles = (onClick?: OnClickUser) => {
  const playerStyle: CSSProperties = {};
  if (onClick) {
    playerStyle.cursor = "pointer";
  }
  return playerStyle;
};
