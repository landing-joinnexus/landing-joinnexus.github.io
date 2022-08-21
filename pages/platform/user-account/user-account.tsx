import ChangeLanguageButton from "components/change-language-button";
import { GalacticWallpaper, GoToFeedButtonWrapper } from "hoc";
import Header from "./header/header";
import Sections from "./sections/sections";
import Styles from './user-account.module.css';

const UserAccount = () => {
  return (
    <GalacticWallpaper isContentHorizontallyCentered={true} isContentVerticallyCentered={false}>
      <GoToFeedButtonWrapper>
        <section className={Styles.container}>
          <Header />
          <Sections />
        </section>
        <ChangeLanguageButton />
      </GoToFeedButtonWrapper>
    </GalacticWallpaper>
  );
};

export default UserAccount;
