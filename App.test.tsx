import { render, screen } from "@testing-library/react";
import App from "App";

jest.mock("./routing", () => {
  return {
    RoutingConfiguration: () => <div data-testid="routing"></div>,
  };
});
describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("should render routing", async () => {
    expect(await screen.findByTestId("routing")).toBeDefined();
  });
});
