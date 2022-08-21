import HomeIcon from "assets/icons/platform/home.svg";
import { GameButton } from "components";
import { useNavigate } from "react-router-dom";
import { GalacticColors } from "enums/galactic-backgrounds";
import { goFeedButtonStyle } from "./index.style";
import Styles from "./index.module.css";
import { goToFeed } from "utils";
import { useTranslation } from "react-i18next";

interface Props {
  children?: React.ReactNode;
}

export const GoToFeedButtonWrapper = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <div className={Styles.container}>
        <GameButton
          dataTestId="go-to-feed-button"
          style={goFeedButtonStyle}
          isRound={true}
          backgroundImage={GalacticColors.BLUE}
          imageSrc={HomeIcon}
          onClick={goToFeed(navigate)}
          tooltip={`${t("common.go_back")}`}
        />
      </div>
      {props.children}
    </>
  );
};
