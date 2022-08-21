import { useShallowEqualSelector } from "store";
import { useUserIsHost } from "./use-user-is-host";

jest.mock("store");

describe("use-user-is-host", () => {
  describe("when is the same", () => {
    beforeEach(() => {
      (useShallowEqualSelector as jest.Mock).mockReturnValue({
        hostUserId: 1,
        userId: 1,
      });
    });

    it("should return true", () => {
      expect(useUserIsHost()).toBeTruthy();
    });
  });

  describe("where is not the same", () => {
    beforeEach(() => {
      (useShallowEqualSelector as jest.Mock).mockReturnValue({
        hostUserId: 1,
        userId: 2,
      });
    });
    it("should return false", () => {
      expect(useUserIsHost()).toBeFalsy();
    });
  });
});
