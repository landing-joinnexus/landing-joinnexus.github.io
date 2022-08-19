import { CSSProperties } from "react";

const commonProperties: CSSProperties = {
  display: "inline-flex",
  gap: "5px",
};

export const horizontalVideoPlayersContainer: CSSProperties = {
  overflowY: "hidden",
  overflowX: "auto",
  ...commonProperties,
};

export const verticalVideoPlayersContainer: CSSProperties = {
  flexDirection: "row",
  flexWrap: "wrap",
  overflowY: "auto",
  height: "60vh",
  ...commonProperties,
};
