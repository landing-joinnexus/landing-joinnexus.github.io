import jwt_decode from "jwt-decode";
import { setUserFromToken } from "./set-user-from-token";

jest.mock("jwt-decode", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});
describe("set-user-from-token", () => {
  beforeEach(() => {
    (jwt_decode as jest.Mock).mockReturnValue({});
  });
  it("should decode and dispatch", () => {
    const dispatch = jest.fn();
    setUserFromToken("test", dispatch);

    expect(dispatch).toBeCalled();
    expect(jwt_decode).toBeCalled();
  });
});
