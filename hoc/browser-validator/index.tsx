import NeonBox from "components/neon-box/neon-box";
import { GalacticWallpaper } from "hoc";
import { useTranslation } from "react-i18next";
import { Browser, getBrowser } from "utils";

interface Props {
  // tslint:disable-next-line: no-any
  children: any;
}

const recommendedBrowsers = [Browser.CHROME, Browser.FIREFOX, Browser.SAFARI];

const browser = getBrowser();

export const BrowserValidator = (props: Props) => {
  const { t } = useTranslation();

  if (recommendedBrowsers.includes(browser)) {
    return props.children;
  }

  return (
    <GalacticWallpaper isContentHorizontallyCentered={true} isContentVerticallyCentered={true}>
      <NeonBox>
        <h2 className="neon">
          {t("common.use_one_recommended_browsers")}: Google Chrome, Moxilla Firefox, Safari
        </h2>
      </NeonBox>
    </GalacticWallpaper>
  );
};
