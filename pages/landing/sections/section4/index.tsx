import Styles from "./index.module.css";
import { Statistic } from "./statistic";
import { statistics } from "./statistics";

export const Section4 = () => (
  <div data-testid="statistics" className={Styles.statistics}>
    {statistics.map((statistic, index) => (
      <Statistic key={index} index={index} {...statistic}></Statistic>
    ))}
  </div>
);
