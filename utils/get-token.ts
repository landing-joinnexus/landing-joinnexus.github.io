import { parseCookies } from "./parse-cookies";

export const getToken = () => {
  const cookiesString = document.cookie;
  const cookies = parseCookies(cookiesString);
  return cookies.loginCookie;
};
