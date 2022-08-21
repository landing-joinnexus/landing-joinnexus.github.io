import { render, screen } from "@testing-library/react";
import GameTitle from "./game-title";

describe("game-title", () => {
  beforeEach(() => {
    render(<GameTitle gameName="test" />);
  });

  it("should display title", async () => {
    expect(await screen.findByTestId("game-title")).toBeDefined();
  });
});
