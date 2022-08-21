import { useShallowEqualSelector } from "store";
import { useStoryUserIsTheSameUserInSession } from "./story-user-is-the-same-user-in-session";

jest.mock("store");

describe("story-user-is-the-same-user-in-session", () => {
  describe("when is the same", () => {
    beforeEach(() => {
      (useShallowEqualSelector as jest.Mock).mockReturnValue({
        userForStoryTime: 1,
        currentUserId: 1,
      });
    });

    it("should return true", () => {
      expect(useStoryUserIsTheSameUserInSession()).toBeTruthy();
    });
  });

  describe("where is not the same", () => {
    beforeEach(() => {
      (useShallowEqualSelector as jest.Mock).mockReturnValue({
        userForStoryTime: 1,
        currentUserId: 2,
      });
    });
    it("should return false", () => {
      expect(useStoryUserIsTheSameUserInSession()).toBeFalsy();
    });
  });
});
