import { useShallowEqualSelector } from "store";
import { render, screen } from "@testing-library/react";
import VideoPlayers from "./video-players";

jest.mock("./render-video-players/render-video-players", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="renderVideoPlayers"></div>;
    },
  };
});

jest.mock("store");

describe("video-players", () => {
  describe("has usersIdsOrder", () => {
    beforeEach(() => {
      (useShallowEqualSelector as jest.Mock).mockReturnValue({
        usersIdsOrder: [{}],
      });
      render(<VideoPlayers />);
    });

    it("should show render video players", async () => {
      expect(await screen.findByTestId("renderVideoPlayers")).toBeDefined();
    });
  });

  describe("has not usersIdsOrder", () => {
    beforeEach(() => {
      (useShallowEqualSelector as jest.Mock).mockReturnValue({
        usersIdsOrder: [],
      });
      render(<VideoPlayers />);
    });

    it("should not show render video players", async () => {
      expect(screen.queryAllByAltText("renderVideoPlayers")).toHaveLength(0);
    });
  });
});
