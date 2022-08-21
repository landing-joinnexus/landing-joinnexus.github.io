import AlternativeIcon from "assets/images/alternative_icon.webp";
import ChangeLanguageButton from "components/change-language-button";
import Logo from "components/logo/logo";
import SocialLoginButton from "components/social-login-button/social-login-button";
import { SocialMedia } from "enums/social-media";
import { GalacticWallpaper } from "hoc";
import { useTranslation } from "react-i18next";
import Styles from "./login.page.module.css";

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <GalacticWallpaper isContentHorizontallyCentered={true} isContentVerticallyCentered={true}>
      <div className={`${Styles.content}`}>
        <Logo></Logo>
        <img
          className={`maxWidth100vw ${Styles.centerIcon}`}
          src={AlternativeIcon}
          alt="Alternative icon"
        />
        <h2 className="neon">{t("login.sign_in_with")}</h2>
        <div className={`centerContent ${Styles.socialMediaButtonsContainer}`}>
          <SocialLoginButton socialMedia={SocialMedia.GOOGLE}></SocialLoginButton>
          <SocialLoginButton socialMedia={SocialMedia.SLACK}></SocialLoginButton>
          <SocialLoginButton socialMedia={SocialMedia.OFFICE365}></SocialLoginButton>
        </div>
      </div>
      <ChangeLanguageButton />
    </GalacticWallpaper>
  );
};

export default LoginPage;
