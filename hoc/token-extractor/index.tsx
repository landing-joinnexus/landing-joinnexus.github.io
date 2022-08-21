import { environment } from "environment";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { Routing } from "routing";
import { roomPin } from "utils";
import { getLoginCookie } from "./utils/get-login-cookie";
import { setUserFromToken } from "./utils/set-user-from-token";

const { loginCookieKey } = environment;

interface Props {
  children?: React.ReactNode;
}

export const TokenExtractor = (props: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cookies, setCookie] = useCookies([loginCookieKey]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useMatch(`/${Routing.platformModule}/${Routing.platform.room}/:pin`);

  const pin = path?.params?.pin;

  useEffect(() => {
    const loginCookie = getLoginCookie(searchParams, cookies, setSearchParams, setCookie);
    if (loginCookie) {
      setUserFromToken(loginCookie, dispatch);
      return;
    }
    if (pin) {
      localStorage.setItem(roomPin, pin);
    }
    navigate(`/${Routing.login}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pin]);

  return <>{props.children}</>;
};
