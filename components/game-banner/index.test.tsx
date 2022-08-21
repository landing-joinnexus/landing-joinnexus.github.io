import { render, screen } from "@testing-library/react";
import { GameBanner } from ".";

describe("game-banner", () => {
  beforeEach(() => {
    render(<GameBanner background={""} name="test" gameId={1} />);
  });

  it("should render a button", async () => {
    const button = await screen.findByText("test");
    expect(button).toBeDefined();
  });
});
