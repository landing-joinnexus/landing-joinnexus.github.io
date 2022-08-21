import { render } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { TokenExtractor } from ".";
import { getLoginCookie } from "./utils/get-login-cookie";
import { setUserFromToken } from "./utils/set-user-from-token";

jest.mock("react-router-dom");
jest.mock("react-redux");
jest.mock("./utils/get-login-cookie");
jest.mock("./utils/set-user-from-token");

describe("token-extractor", () => {
  beforeEach(() => {
    (useMatch as jest.Mock).mockReturnValue({
      params: {
        pin: "123",
      },
    });
    (useSearchParams as jest.Mock).mockReturnValue(["123", jest.fn()]);
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
  });

  describe("has a login cookie", () => {
    beforeEach(() => {
      (getLoginCookie as jest.Mock).mockReturnValue("123");
      render(<TokenExtractor />);
    });

    it("should set user from token", () => {
      expect(setUserFromToken).toBeCalled();
    });
  });

  describe("has a pin", () => {
    const navigate = jest.fn();
    beforeEach(() => {
      (getLoginCookie as jest.Mock).mockReturnValue(null);
      (useNavigate as jest.Mock).mockReturnValue(navigate);
      render(<TokenExtractor />);
    });

    it("should navigate to login", () => {
      expect(navigate).toBeCalled();
    });
  });

  describe("has no pin", () => {
    const navigate = jest.fn();
    beforeEach(() => {
      (useMatch as jest.Mock).mockReturnValue({
        params: {
          pin: null,
        },
      });
      (getLoginCookie as jest.Mock).mockReturnValue(null);
      (useNavigate as jest.Mock).mockReturnValue(navigate);
      render(<TokenExtractor />);
    });

    it("should navigate to login", () => {
      expect(navigate).toBeCalled();
    });
  });
});
