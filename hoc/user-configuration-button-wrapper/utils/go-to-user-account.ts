import { NavigateFunction } from "react-router-dom";
import { Routing } from "routing";

export const goToUserAccount = (navigate: NavigateFunction) => () => {
  navigate(`/${Routing.platformModule}/account`);
};
