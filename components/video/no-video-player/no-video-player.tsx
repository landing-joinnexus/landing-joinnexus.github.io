import NoVideoIcon from "assets/icons/platform/video_off.svg";
import { CSSProperties } from "react";
interface Props {
  className?: string;
  style?: CSSProperties;
}

const NoVideoPlayer = (props: Props) => {
  const style = props.style || {};
  return (
    <div
    className={props.className}
      data-testid="no-video-player"
      style={{ ...style, display: "flex", justifyContent: "center" }}
    >
      <img alt="no-video" src={NoVideoIcon} />
    </div>
  );
};

export default NoVideoPlayer;
