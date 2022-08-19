import { render } from "@testing-library/react";
import { gameService } from "services/game.service";
import { useShallowEqualSelector } from "store";
import { GameWrapper } from ".";
import { getGameWithCategories } from "./utils/get-game-with-categories";

jest.mock("store");
jest.mock("./utils/get-game-with-categories");
jest.mock("services/game.service");
jest.mock("react-redux");

describe("game-wrapper", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.useFakeTimers();
  });
  describe("has no gameId", () => {
    beforeEach(() => {
      (useShallowEqualSelector as jest.Mock).mockReturnValue({
        gameId: null,
      });
      render(<GameWrapper />);
    });

    it("should not call methods", () => {
      expect(getGameWithCategories).not.toBeCalled();
      expect(gameService.findGameWithDetails).not.toBeCalled();
    });
  });

  describe("has a game", () => {
    beforeEach(() => {
      (useShallowEqualSelector as jest.Mock).mockReturnValue({
        gameId: 1,
        games: [
          {
            id: 1,
          },
        ],
      });
      render(<GameWrapper />);
      jest.runAllTicks();
    });

    it("should call getGameWithCategories", () => {
      expect(getGameWithCategories).toBeCalled();
      expect(gameService.findGameWithDetails).not.toBeCalled();
    });
  });

  describe("has no game", () => {
    beforeEach(() => {
      (useShallowEqualSelector as jest.Mock).mockReturnValue({
        gameId: 1,
        games: [
          {
            id: 2,
          },
        ],
      });
      (gameService.findGameWithDetails as jest.Mock).mockResolvedValue({
        data: {},
      });
      render(<GameWrapper />);
      jest.runAllTicks();
    });

    it("should call getGameWithCategories and findGameWithDetails", () => {
      expect(gameService.findGameWithDetails).toBeCalled();
    });
  });
});
