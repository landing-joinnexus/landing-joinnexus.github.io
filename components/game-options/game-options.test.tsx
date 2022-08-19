import { screen, render } from "@testing-library/react";
import { useSelector } from "react-redux";
import GameOptions from "./game-options";

jest.mock("react-redux");
jest.mock("./game-option/game-option", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="option"></div>;
    },
  };
});
describe("game-options", () => {
  describe("when there are options", () => {
    beforeEach(() => {
      (useSelector as jest.Mock).mockReturnValue([
        {
          id: 1,
          optionLanguages: [
            {
              languageId: "en",
            },
          ],
        },
      ]);
      render(<GameOptions />);
    });

    it("should display an option", async () => {
      expect(await screen.findByTestId("option")).toBeDefined();
    });
  });
});
