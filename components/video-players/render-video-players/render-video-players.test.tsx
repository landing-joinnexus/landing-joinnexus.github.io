import { render, screen } from "@testing-library/react";
import RenderVideoPlayers from "./render-video-players";

const props = {
  currentUserId: 1,
  omitUserids: [2],
  // tslint:disable-next-line: no-empty
  onClick: () => {},
  usersIdsOrder: [1, 2, 3],
  highlightUsers: [],
  usersDetails: { 3: { _id: "123", name: "test", connectionId: "123" } },
  width: "100px",
};

jest.mock("store", () => {
  return {
    useShallowEqualSelector: () => ({
      hostUserId: 1,
    }),
  };
});
jest.mock("components/host-title/host-title", () => {
  return {
    __esModule: true,
    default: () => {
      return <div></div>;
    },
  };
});

describe("render-video-players", () => {
  describe("vertical", () => {
    beforeEach(() => {
      render(<RenderVideoPlayers {...props} isVertical={true} />);
    });
    it("render video-players", async () => {
      const element = await screen.findByTestId("video-players");
      expect(element.style.flexWrap).toBe("wrap");
    });
  });

  describe("horizonal", () => {
    beforeEach(() => {
      render(<RenderVideoPlayers {...props} isVertical={false} />);
    });

    it("render video-players", async () => {
      const element = await screen.findByTestId("video-players");
      expect(element.style.overflowX).toBe("auto");
    });
  });
});
