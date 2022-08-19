import { render, screen } from "@testing-library/react";
import { GalacticWallpaper } from ".";

describe("galactic-wallpaper", () => {
  beforeEach(() => {
    render(<GalacticWallpaper />);
  });

  it("should render fullscreen-wallpaper", async () => {
    expect(await screen.findByTestId("fullscreen-wallpaper")).toBeDefined();
  });
});
