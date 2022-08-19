import { UserInformationWrapper } from "hoc";
import Controls from "./controls/controls";
import Styles from "./video-player.module.css";

const initialStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "20px",
  left: "20px",
};

const VideoPlayer = () => {
  return (
    <div className={Styles.playerVideoContainer} style={initialStyle}>
      <UserInformationWrapper />
      <Controls />
    </div>
  );
};

export default VideoPlayer;
