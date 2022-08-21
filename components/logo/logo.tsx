import LogoImage from "assets/images/logo.webp";
import Styles from "./logo.module.css";

const Logo = () => (
  <img data-testid="logo" alt="Nexus logo" src={LogoImage} className={Styles.logo} />
);

export default Logo;
