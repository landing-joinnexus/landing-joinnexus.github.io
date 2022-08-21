import { useEffect, useRef } from "react";
import { AudioTrack } from "twilio-video";

interface Props {
  audioTrack: AudioTrack;
}

export const Audio = (props: Props) => {
  const audioRef = useRef(null);
  const {audioTrack} = props;
  
  useEffect(() => {
    if (audioTrack && audioRef.current) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      }
    }
  }, [audioTrack]);
  
  return <audio ref={audioRef} autoPlay={true} />;
};
