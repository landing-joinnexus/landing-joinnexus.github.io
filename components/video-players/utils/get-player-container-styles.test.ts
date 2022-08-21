import { getPlayerContainerStyles } from "./get-player-container-styles";

describe("get-player-container-styles", () => {
  describe("has onClick", () => {
    it("should has pointer", () => {
      expect(getPlayerContainerStyles(jest.fn()).cursor).toBe("pointer");
    });
  });

  describe("has not onClick", () => {
    expect(getPlayerContainerStyles()).not.toBe("pointer");
  });
});
