import { Tooltip } from "@mui/material";
import ClueImage from "assets/images/clue.webp";
import { Clues } from "./clues";
import Styles from './index.module.css';

export const Clue = () => {
  return (
    <div className={Styles.container}>
      <Tooltip title={<Clues />} placement="left">
        <img className={Styles.clueImg} src={ClueImage} alt="" />
      </Tooltip>
    </div>
  );
};
