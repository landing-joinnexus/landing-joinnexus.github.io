import { render, screen } from "@testing-library/react";
import Logo from "./logo";

describe("logo", () => {
  beforeEach(() => {
    render(<Logo />);
  });

  it("should display logo", async () => {
    expect(await screen.findByTestId("logo")).toBeDefined();
  });
});
