import browser from "browser-detect";
const result = browser();

export enum Browser {
  CHROME = "chrome",
  FIREFOX = "firefox",
  SAFARI = "safari",
  EDGE = "edge",
}

export const getBrowser = (): Browser => {
  switch (result.name) {
    case "chrome":
      return Browser.CHROME;
    case "firefox":
      return Browser.FIREFOX;
    case "safari":
      return Browser.SAFARI;
    default:
      return Browser.EDGE;
  }
};
