import GoogleIcon from "assets/icons/social-media/google-white.svg";
import Office365Icon from "assets/icons/social-media/office365-white.svg";
import SlackIcon from "assets/icons/social-media/slack-white.svg";
import { GameButton } from "components";
import { SocialMedia } from "enums/social-media";
import { values } from "lodash";
import { useTranslation } from "react-i18next";
import { environment } from "environment";
import { GalacticColors } from "enums/galactic-backgrounds";

interface Props {
  socialMedia: SocialMedia;
}

const getSocialMediaIcon = (socialMedia: SocialMedia) => {
  switch (socialMedia) {
    case SocialMedia.GOOGLE:
      return GoogleIcon;
    case SocialMedia.OFFICE365:
      return Office365Icon;
    case SocialMedia.SLACK:
      return SlackIcon;
    default:
      throw Error(`Choose a social media between: ${values(SocialMedia).join(",")}`);
  }
};

const getSocialMediaUrl = (socialMedia: SocialMedia) => {
  switch (socialMedia) {
    case SocialMedia.GOOGLE:
      return environment.login.google;
    case SocialMedia.OFFICE365:
      return environment.login.office365;
    case SocialMedia.SLACK:
      return environment.login.slack;
  }
};

const goToSocialMediaLogin = (url: string) => () => window.open(url, "_self");

const SocialLoginButton = (props: Props) => {
  const { t } = useTranslation();
  const { socialMedia } = props;
  const icon: string = getSocialMediaIcon(socialMedia);
  const socialMediaUrl: string = getSocialMediaUrl(socialMedia);

  return (
    <GameButton
      dataTestId={`social-login-button-${socialMedia}`}
      onClick={goToSocialMediaLogin(socialMediaUrl)}
      backgroundImage={GalacticColors.BLUE}
      imageSrc={icon}
      isRound={true}
      tooltip={`${t("login.sign_in_with")} ${props.socialMedia}`}
    />
  );
};

export default SocialLoginButton;
