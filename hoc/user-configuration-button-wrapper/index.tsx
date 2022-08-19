import AstronautIcon from "assets/icons/platform/astronaut.svg";
import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Styles from "./index.module.css";
import { userButtonStyle } from "./index.style";
import { goToUserAccount } from "./utils/go-to-user-account";

interface Props {
  children?: React.ReactNode;
}

export const UserConfigurationButtonWrapper = (props: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <div className={Styles.container}>
        <GameButton
          dataTestId="go-to-account-button"
          style={userButtonStyle}
          isRound={true}
          backgroundImage={GalacticColors.BLUE}
          imageSrc={AstronautIcon}
          onClick={goToUserAccount(navigate)}
          tooltip={`${t('common.user_configuration')}`}
        />
      </div>
      {props.children}
    </>
  );
};
