import { BrowserValidator, TokenExtractor } from "hoc";
import { UserPlanManagement } from "pages/platform";
import RoomPage from "pages/platform/room/room.page";
import RoomsPage from "pages/platform/rooms/rooms.page";
import UserAccount from "pages/platform/user-account/user-account";
import { Route, Routes } from "react-router-dom";
import { Routing } from "routing";

const Platform = () => (
  <TokenExtractor>
    <BrowserValidator>
      <Routes>
        <Route path={Routing.platform.rooms} element={<RoomsPage />} />
        <Route path={`${Routing.platform.room}/:pin`} element={<RoomPage />} />
        <Route path={`account`} element={<UserAccount />} />
        <Route path={'user-plan-management'} element={<UserPlanManagement />} />
      </Routes>
    </BrowserValidator>
  </TokenExtractor>
);

export default Platform;
