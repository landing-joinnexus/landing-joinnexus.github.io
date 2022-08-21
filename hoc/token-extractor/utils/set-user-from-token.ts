import jwt_decode from "jwt-decode";
import { User } from "models";
import { Dispatch } from "react";
import { setUser } from "store/user.store";

export const setUserFromToken = (loginCookie: string, dispatch: Dispatch<unknown>) => {
  const userDecoded: User = jwt_decode(loginCookie);
  dispatch(setUser(userDecoded));
};
