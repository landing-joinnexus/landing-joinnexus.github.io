import Styles from './index.module.css';

interface Props {
  style?: React.CSSProperties;
  gameId?: number;
  background: string;
  name: string;
}

export const GameBanner = (props: Props) => {
  const styles = {
    background: `url(${props.background})`
  }
  return (
    <button className={Styles.button} style={styles}>
      <span className={Styles.label}>{props.name}</span>
      <img className={Styles.image} src={`/assets/game-button/game_${props.gameId}.webp`} alt={"game"} />
    </button>
  )
}
