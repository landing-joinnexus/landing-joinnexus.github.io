import { GalacticWallpaper, GoToFeedButtonWrapper } from "hoc";
import { Header } from "./header";
import Styles from "./index.module.css";
import { Table } from "./table";

export const BillsView = () => {
  return (
    <GalacticWallpaper>
      <GoToFeedButtonWrapper>
        <section className={Styles.container}>
          <Header />
          <Table />
        </section>
      </GoToFeedButtonWrapper>
    </GalacticWallpaper>
  );
};
