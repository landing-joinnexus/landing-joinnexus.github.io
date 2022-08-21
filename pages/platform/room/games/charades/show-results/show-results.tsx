import NeonBox from "components/neon-box/neon-box";
import VideoPlayers from "components/video-players/video-players";
import BottomSection from "./bottom-section/bottom-section";
import { Results } from "./results";

export const ShowResults = () => {
  return (
    <>
      <VideoPlayers />
      <NeonBox>
        <Results />
      </NeonBox>
      <BottomSection />
    </>
  );
};

export default ShowResults;
