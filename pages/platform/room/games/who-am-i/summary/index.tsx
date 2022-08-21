import NextButton from "components/next-button/next-button";
import VideoPlayers from "components/video-players/video-players";
import { CharacterInformation } from "./character-information";

export const Summary = () => {
  return (
    <>
      <CharacterInformation />
      <VideoPlayers omitUserids={[]} />
      <NextButton />
    </>
  );
};
