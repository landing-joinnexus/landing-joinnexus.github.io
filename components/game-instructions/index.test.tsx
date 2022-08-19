import { queryByTestId, render } from "@testing-library/react";
import { GameInstructions } from ".";

jest.mock("components/game-categories", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="categories"></div>;
    },
  };
});

jest.mock('./start-game-button', () => {
  return {
    __esModule: true,
    default: () => {
      return null;
    },
  };
});

describe("game-instructions", () => {
  describe("when should hide categories", () => {
    let container: HTMLElement;
    beforeEach(() => {
      const rendering = render(<GameInstructions gameName={"test"} hideCategories={true} />);
      container = rendering.container;
    });

    it("should not show categories", async () => {
      expect(queryByTestId(container, "categories")).toBeNull();
    });
  });

  describe("when should show categories", () => {
    let container: HTMLElement;
    beforeEach(() => {
      const rendering = render(<GameInstructions gameName={"test"} />);
      container = rendering.container;
    });

    it("should show categories", async () => {
      expect(queryByTestId(container, "categories")).toBeDefined();
    });
  });
});
