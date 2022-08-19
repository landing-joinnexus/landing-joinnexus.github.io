import Styles from "./game-title.module.css";

interface Props {
  gameName: string;
}

const GameTitle = (props: Props) => (
  <h1 data-testid="game-title" className={`${Styles.gameTitle}`}>
    {props.gameName}
  </h1>
);
export default GameTitle;
