import { VideoUser } from "models";
import { Room, Participant } from "twilio-video";
import { VideoUserActionAction } from "../enum";

export interface VideoUserAction {
  type: VideoUserActionAction;
  payload?: Partial<VideoUser>;
  room?: Room;
  participant?: Participant;
}
