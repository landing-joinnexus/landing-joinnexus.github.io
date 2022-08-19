import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import GameCategories from ".";

jest.mock("react-redux", () => {
  return {
    useSelector: jest.fn(),
  };
});

jest.mock("./game-category", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="category"></div>;
    },
  };
});

describe("game-categories", () => {
  describe("when there are categories", () => {
    beforeEach(() => {
      (useSelector as jest.Mock).mockReturnValue([{ id: 1 }, { id: 2 }]);
      render(<GameCategories />);
    });

    it("should display 2 elements", async () => {
      expect(await screen.findAllByTestId("category")).toHaveLength(2);
    });
  });

  describe("when there are not categories", () => {
    beforeEach(() => {
      (useSelector as jest.Mock).mockReturnValue([]);
      render(<GameCategories />);
    });

    it("should show progressbar", async () => {
      expect(await screen.findByRole("progressbar")).toBeDefined();
    });
  });
});
