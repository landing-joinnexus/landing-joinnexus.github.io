import { NavigateFunction } from "react-router-dom";
import { Routing } from "routing";

export const goToFeed = (navigate: NavigateFunction) => () => {
  navigate(`/${Routing.platformModule}/${Routing.platform.rooms}`);
};
