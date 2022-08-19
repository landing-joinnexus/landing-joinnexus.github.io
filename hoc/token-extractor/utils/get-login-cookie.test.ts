import { getLoginCookie } from "./get-login-cookie";

describe("get-login-cookie", () => {
  const setCookie = jest.fn();
  const setSearchParams = jest.fn();
  const cookies = {};
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should save cookie", () => {
    const searchParams: URLSearchParams = {
      get: () => "123",
    } as unknown as URLSearchParams;
    getLoginCookie(searchParams, cookies, setSearchParams, setCookie);
    expect(setCookie).toBeCalled();
    expect(setSearchParams).toBeCalled();
  });

  it("should not save cookie", () => {
    const searchParams: URLSearchParams = {
      get: () => null,
    } as unknown as URLSearchParams;
    getLoginCookie(searchParams, cookies, setSearchParams, setCookie);
    expect(setCookie).not.toBeCalled();
    expect(setSearchParams).not.toBeCalled();
  });
});
