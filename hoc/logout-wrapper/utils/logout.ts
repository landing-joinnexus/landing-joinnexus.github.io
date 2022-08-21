import { NavigateFunction } from "react-router-dom";
import { Routing } from "routing";

export const logout = (navigate: NavigateFunction) => () => {
  navigate(`/${Routing.login}`);
};
