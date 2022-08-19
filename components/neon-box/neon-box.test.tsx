import { render, screen } from "@testing-library/react";
import NeonBox from "./neon-box";

describe("neon-box", () => {
  beforeEach(() => {
    render(<NeonBox />);
  });

  it("should display neon box", async () => {
    expect(await screen.findByTestId("neon-box")).toBeDefined();
  });
});
