import { CookieSetOptions } from "universal-cookie";
import { environment } from "environment";

const { loginCookieKey } = environment;

export const getLoginCookie = (
  searchParams: URLSearchParams,
  cookies: Record<string, string>,
  // tslint:disable-next-line: no-any
  setSearchParams: (key: string, value: any) => void,
  setCookie: (name: string, value: unknown, options?: CookieSetOptions | undefined) => void,
): string | null => {
  let loginCookie = searchParams.get(loginCookieKey);
  if (loginCookie) {
    setCookie(loginCookieKey, loginCookie);
    setSearchParams("", { replace: true });
  } else {
    loginCookie = cookies.loginCookie;
  }
  return loginCookie;
};
