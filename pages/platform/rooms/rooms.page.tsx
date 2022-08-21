import ChangeLanguageButton from "components/change-language-button";
import { GalacticWallpaper, LogoutWrapper } from "hoc";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routing } from "routing";
import { roomPin } from "utils";
import CreateRoom from "./create-room/create-room";

const RoomsPage = () => {
  const navigate = useNavigate();

  const pin = localStorage.getItem(roomPin);

  useEffect(() => {
    if (!pin) return;
    const roomUrl = `/${Routing.platformModule}/${Routing.platform.room}/${pin}`;
    setTimeout(() => {
      navigate(roomUrl);
    }, 10);
    localStorage.removeItem(roomPin);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LogoutWrapper>
      <GalacticWallpaper isContentHorizontallyCentered={true} isContentVerticallyCentered={true}>
        <CreateRoom />
        <ChangeLanguageButton />
      </GalacticWallpaper>
    </LogoutWrapper>
  );
};

export default RoomsPage;
