import vsImage from "assets/images/vs.webp";
import { Video } from "components/video";
import VideoPlayers from "components/video-players/video-players";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import Styles from "./index.module.css";

interface Props {
  hasTheSameAnswer: boolean;
}

export const DebatePlayers = (props: Props) => {
  const { t } = useTranslation();
  const { votes, usersForStoryTime, usersDetails } = useShallowEqualSelector((state: RootState) => ({
    votes: state.room.gameState?.votes as Record<number, number>,
    usersForStoryTime: state.room.gameState?.usersForStoryTime || [],
    usersDetails: state.room.usersDetails,
  }));

  let agreePlayer = null;

  let disagreePlayer = null;

  const [player1, player2] = usersForStoryTime;

  const firstPlayerIsPositive = votes[player1] === 1;

  if (props.hasTheSameAnswer) return <VideoPlayers />;

  if (firstPlayerIsPositive) {
    agreePlayer = player1;
    disagreePlayer = player2;
  } else {
    agreePlayer = player2;
    disagreePlayer = player1;
  }

  return (
    <div className={Styles.container}>
      <div>
        <h2 className="neon">{t("debate.agree")}</h2>
        <Video className={Styles.videoPlayer} userId={agreePlayer} />
        <h3 className="neon">{usersDetails[agreePlayer]?.name}</h3>
      </div>
      <div className={Styles.vsContainer}>
        <img src={vsImage} alt="vs" />
      </div>
      <div>
        <h2 className="neon">{t("debate.disagree")}</h2>
        <Video className={Styles.videoPlayer} userId={disagreePlayer} />
        <h3 className="neon">{usersDetails[disagreePlayer]?.name}</h3>
      </div>
    </div>
  );
};
