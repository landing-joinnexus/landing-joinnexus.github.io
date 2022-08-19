import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useShallowEqualSelector, RootState } from "store";
import { AudioControl } from "./audio-control/audio-control";
import { VideoControl } from "./video-control/video-control";

const Controls = () => {
  const { uid } = useShallowEqualSelector((state: RootState) => ({
    uid: state.video.uid,
  }));

  if (!uid) return null;
  return (
    <div>
      <ToggleButtonGroup aria-label="controls">
        <AudioControl />
        <VideoControl />
      </ToggleButtonGroup>
    </div>
  );
};

export default Controls;
