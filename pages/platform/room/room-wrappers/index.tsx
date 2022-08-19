import { VideoUserAction, VideoUserConsumer, VideoUserProvider, VideoUserState } from "contexts";
import {
  PlanValidatorWrapper,
  PopupsMessagesWrapper,
  RoomUserManager,
  ShareButtonWrapper,
  UserMediaWrapper,
  VideoWrapper,
} from "hoc";
import { ReactNode } from "react";
import RoomWallpaperManager from "../room-wallpaper-manager/room-wallpaper-manager";

interface Props {
  children: ReactNode;
}
export const RoomWrappers = (props: Props) => {
  return (
    <PlanValidatorWrapper>
      <UserMediaWrapper>
        <RoomUserManager>
          <VideoUserProvider>
            <VideoUserConsumer>
              {consumer => {
                return (
                  <>
                    <VideoWrapper
                      dispatch={
                        (consumer as { dispatch: React.Dispatch<VideoUserAction> }).dispatch
                      }
                      videoUserState={(consumer as { state: VideoUserState }).state}
                    >
                      <RoomWallpaperManager>
                        <ShareButtonWrapper>
                          <PopupsMessagesWrapper>{props.children}</PopupsMessagesWrapper>
                        </ShareButtonWrapper>
                      </RoomWallpaperManager>
                    </VideoWrapper>
                  </>
                );
              }}
            </VideoUserConsumer>
          </VideoUserProvider>
        </RoomUserManager>
      </UserMediaWrapper>
    </PlanValidatorWrapper>
  );
};
