import LogoutIcon from "assets/icons/platform/logout.svg";
import { GameButton } from "components";
import { useNavigate } from "react-router-dom";
import { GalacticColors } from "enums/galactic-backgrounds";
import { logoutButtonStyle } from "./index.style";
import Styles from "./index.module.css";
import { logout } from "./utils/logout";
import { useTranslation } from "react-i18next";

interface Props {
  children?: React.ReactNode;
}

export const LogoutWrapper = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className={Styles.container}>
        <GameButton
          dataTestId="logout-button"
          style={logoutButtonStyle}
          isRound={true}
          backgroundImage={GalacticColors.BLUE}
          imageSrc={LogoutIcon}
          onClick={logout(navigate)}
          tooltip={`${t('login.logout')}`}
        />
      </div>
      {props.children}
    </>
  );
};
