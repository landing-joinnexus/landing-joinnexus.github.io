import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SocialMedia } from "enums/social-media";
import { act } from "react-dom/test-utils";
import SocialLoginButton from "./social-login-button";

jest.mock("environment", () => {
  return {
    environment: {
      login: {
        google: "http://login-google.com",
        slack: "http://login-slack.com",
        office365: "http://login-office365.com",
      },
    }
  };
});

describe("social-login-button", () => {
  let open: jest.SpyInstance;
  beforeEach(() => {
    jest.resetAllMocks();
    open = jest.spyOn(window, "open");
    open.mockReturnValue(true);
  });

  describe("google", () => {
    beforeEach(async () => {
      render(<SocialLoginButton socialMedia={SocialMedia.GOOGLE} />);

      await act(async () => {
        await userEvent.click(screen.getByTestId(`social-login-button-${SocialMedia.GOOGLE}`));
      });
    });

    it("should redirect to google login", () => {
      expect(open).toBeCalledWith("http://login-google.com", "_self");
    });
  });

  describe("slack", () => {
    beforeEach(async () => {
      render(<SocialLoginButton socialMedia={SocialMedia.SLACK} />);

      await act(async () => {
        await userEvent.click(screen.getByTestId(`social-login-button-${SocialMedia.SLACK}`));
      });
    });

    it("should redirect to slack login", () => {
      expect(open).toBeCalledWith("http://login-slack.com", "_self");
    });
  });

  describe("office365", () => {
    beforeEach(async () => {
      render(<SocialLoginButton socialMedia={SocialMedia.OFFICE365} />);

      await act(async () => {
        await userEvent.click(screen.getByTestId(`social-login-button-${SocialMedia.OFFICE365}`));
      });
    });

    it("should redirect to office365 login", () => {
      expect(open).toBeCalledWith("http://login-office365.com", "_self");
    });
  });

  describe("unknown", () => {
    it("should thrown an error", () => {
      expect(() => render(<SocialLoginButton socialMedia={'unknown' as SocialMedia}/>))
      .toThrow();
    });
  });
});
