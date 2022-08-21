import Position1Image from "assets/icons/score-table/position_1.webp";
import Position2Image from "assets/icons/score-table/position_2.webp";
import Position3Image from "assets/icons/score-table/position_3.webp";
import { Video } from "components/video";
import { useShallowEqualSelector, RootState } from "store";
import Styles from "./index.module.css";

const PositionImages: Record<string, string> = {
  "1": Position1Image,
  "2": Position2Image,
  "3": Position3Image,
};

interface Props {
  score: {
    userId: number;
    score: number;
  };
  scorePlaces: Map<number, number>;
}

export const Row = ({ score, scorePlaces }: Props) => {
  const { usersDetails } = useShallowEqualSelector((state: RootState) => ({
    usersDetails: state.room.usersDetails,
  }));

  const position = scorePlaces.get(score.score);
  const isValidPosition = [1, 2, 3].includes(position as number);
  let image;

  if (isValidPosition) {
    const imageSrc = PositionImages[String(position)];
    image = <img className={Styles.prizeImage} src={imageSrc} alt="position" />;
  }

  return (
    <tr>
      <td>
        <Video className={Styles.videoPlayer} userId={score.userId} />
      </td>
      <td>
        <h3 className="neon">{usersDetails[String(score.userId)].name}</h3>
      </td>
      <td>
        <h3 className="neon">{score.score}</h3>
      </td>
      <td>{image}</td>
    </tr>
  );
};
