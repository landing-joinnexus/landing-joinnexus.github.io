import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { UserMediaWrapper } from ".";

jest.mock("@mui/material", () => {
  return {
    CircularProgress: () => <div data-testid="loading"></div>,
  };
});
jest.mock("components/permissions-issues/permissions-issues", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="permission-issues"></div>;
    },
  };
});
describe("user-media-wrapper", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  describe("when has no permissions", () => {
    beforeEach(() => {
      Object.assign(navigator, {
        mediaDevices: {
          getUserMedia: jest.fn().mockRejectedValue("Error"),
        },
      });
    });

    it("should render permissions issues", async () => {
      await act(async () => {
        render(<UserMediaWrapper />);
        expect(await screen.findByTestId("permission-issues")).toBeDefined();
      });
    });
  });

  describe("when has permissions", () => {
    beforeEach(() => {
      Object.assign(navigator, {
        mediaDevices: {
          getUserMedia: jest.fn(),
        },
      });
    });

    it("should render permissions issues", async () => {
      await act(async () => {
        render(
          <UserMediaWrapper>
            <div data-testid="content"></div>
          </UserMediaWrapper>,
        );
        jest.runAllTicks();
        expect(await screen.findByTestId("content")).toBeDefined();
      });
    });
  });
});
