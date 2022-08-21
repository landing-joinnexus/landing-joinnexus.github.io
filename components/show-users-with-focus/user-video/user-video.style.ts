import { CSSProperties } from "react";

const videoPlayerHeightSize = "25vh";

const videoPlayerWidthSize = `calc(${videoPlayerHeightSize} * 6 / 5)`;

export const videoStyle: CSSProperties = {
  height: videoPlayerHeightSize,
  width: videoPlayerWidthSize,
  borderRadius: "20px",
};
