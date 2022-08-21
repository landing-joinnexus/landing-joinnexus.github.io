import { render, act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { roomService } from "services/room.service";
import { useShallowEqualSelector } from "store";
import GameOption from "./game-option";

jest.mock("store");
jest.mock("services/room.service");

describe("game-option", () => {
  beforeEach(() => {
    (useShallowEqualSelector as jest.Mock).mockReturnValue({});
  });
  describe("when the user clicks", () => {
    beforeEach(async () => {
      render(<GameOption id={1} isPositive={true} label={"click me"} />);

      await act(async () => {
        userEvent.click(screen.getByText(/click me/i));
      });
    });
    it("should save vote", () => {
      expect(roomService.voteGame).toBeCalled();
    });
  });

  describe("when the option is negative", () => {
    beforeEach(async () => {
      render(<GameOption id={1} isPositive={false} label={"click me"} />);

      await act(async () => {
        userEvent.click(screen.getByText(/click me/i));
      });
    });
    it("should save vote", () => {
      expect(roomService.voteGame).toBeCalled();
    });
  });
});
