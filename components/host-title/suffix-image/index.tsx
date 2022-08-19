import { RootState, useShallowEqualSelector } from "store";
import { GameID, suffixImage } from "utils";
import Styles from "./index.module.css";

interface Props {
  counterValue: number;
}

export const SuffixImage = (props: Props) => {
  const { counterValue } = props;
  const { gameId } = useShallowEqualSelector((state: RootState) => ({
    gameId: state.room.gameId,
  }));

  if (!counterValue) {
    return null;
  }

  return <img className={Styles.img} src={suffixImage(gameId as GameID)} alt="particle" />;
};
