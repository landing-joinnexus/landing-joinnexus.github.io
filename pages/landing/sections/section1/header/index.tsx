import Styles from './index.module.css';
import Logo from "assets/images/logo.webp";

export const Header = () => {
  return (
    <header className={Styles.header}>
      <div className={Styles.logoContainer}>
        <img className={Styles.logo} alt={"logo"} src={Logo} />
      </div>
    </header>
  );
};
