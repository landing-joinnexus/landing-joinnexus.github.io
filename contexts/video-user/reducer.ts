import {
  addAudio,
  addRoom,
  addUser,
  addVideo,
  muteAudioUser,
  muteVideoUser,
  removeAudio,
  removeRoom,
  removeUser,
  removeVideo,
  unmuteAudioUser,
  unmuteVideoUser
} from "./actions";
import { VideoUserActionAction } from "./enum";
import { VideoUserAction, VideoUserState } from "./interfaces";

export const initialState: VideoUserState = {
  video: {},
  audio: {},
  participants: {},
};

export const reducer = (state: VideoUserState, action: VideoUserAction) => {
  switch (action.type) {
    case VideoUserActionAction.MUTE_AUDIO_USER:
      return muteAudioUser(state, action);
    case VideoUserActionAction.UNMUTE_AUDIO_USER:
      return unmuteAudioUser(state, action);
    case VideoUserActionAction.MUTE_VIDEO_USER:
      return muteVideoUser(state, action);
    case VideoUserActionAction.UNMUTE_VIDEO_USER:
      return unmuteVideoUser(state, action);
    case VideoUserActionAction.ADD_ROOM:
      return addRoom(state, action);
    case VideoUserActionAction.REMOVE_ROOM:
      return removeRoom(state, action);
    case VideoUserActionAction.ADD_USER:
      return addUser(state, action);
    case VideoUserActionAction.REMOVE_USER:
      return removeUser(state, action);
    case VideoUserActionAction.ADD_VIDEO:
      return addVideo(state, action);
    case VideoUserActionAction.REMOVE_VIDEO:
      return removeVideo(state, action);
    case VideoUserActionAction.ADD_AUDIO:
      return addAudio(state, action);
    case VideoUserActionAction.REMOVE_AUDIO:
      return removeAudio(state, action);
    default:
      return state;
  }
};
