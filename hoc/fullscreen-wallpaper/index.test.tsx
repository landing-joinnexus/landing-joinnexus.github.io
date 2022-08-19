import { render, screen } from "@testing-library/react";
import { FullscreenWallpaper } from ".";

describe("fullscreen-wallpaper", () => {
  describe("is content vertical center", () => {
    beforeEach(() => {
      render(<FullscreenWallpaper backgroundImage={""} isContentVerticallyCentered={true} />);
    });

    it("should be center", async () => {
      const element = await screen.findByTestId("fullscreen-wallpaper");
      expect(element.style.alignItems).toBe("center");
      expect(element.style.display).toBe("flex");
    });
  });

  describe("is content horizontal center", () => {
    beforeEach(() => {
      render(<FullscreenWallpaper backgroundImage={""} isContentHorizontallyCentered={true} />);
    });

    it("should be center", async () => {
      const element = await screen.findByTestId("fullscreen-wallpaper");
      expect(element.style.justifyContent).toBe("center");
      expect(element.style.display).toBe("flex");
    });
  });
});
