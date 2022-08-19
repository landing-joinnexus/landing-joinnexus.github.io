import NextButton from "components/next-button/next-button";
import VideoPlayers from "components/video-players/video-players";
import Results from "./results";

const ShowResults = () => {
  return (
    <>
      <VideoPlayers />
      <Results />
      <NextButton />
    </>
  );
}

export default ShowResults;
