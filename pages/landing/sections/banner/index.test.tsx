import { render, screen } from "@testing-library/react";
import { Banner } from ".";

describe("section-2", () => {
  beforeEach(() => {
    render(<Banner img="" subtitle="" title="" />);
  });

  it("renders focus", () => {
    const linkElement = screen.getByTestId("focus");
    expect(linkElement).toBeInTheDocument();
  });

  it("renders rocket", () => {
    const linkElement = screen.getByTestId("rocket");
    expect(linkElement).toBeInTheDocument();
  });
});
