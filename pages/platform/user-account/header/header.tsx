import AstronautIcon from "assets/icons/platform/astronaut.svg";
import { RootState, useShallowEqualSelector } from "store";
import Styles from "./header.module.css";

const Header = () => {
  const { username, email } = useShallowEqualSelector((state: RootState) => ({
    username: state.user.name,
    email: state.user.email,
  }));

  return (
    <div className="topElement">
      <section className={Styles.container}>
        <h1 className="neon">Account</h1>
        <img className={Styles.profileImage} src={AstronautIcon} alt="astronaut-icon" />
        <h3 className="neon">{username}</h3>
        <h3 className="neon">{email}</h3>
      </section>
    </div>
  );
};

export default Header;
