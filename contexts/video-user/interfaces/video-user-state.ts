import { VideoTrack, AudioTrack, Room, Participant } from "twilio-video";

export interface VideoUserState {
  video: Record<string, VideoTrack>;
  audio: Record<string, AudioTrack>;
  room?: Room;
  participants: Record<string, Participant>;
}
