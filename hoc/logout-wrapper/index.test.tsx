import { render, screen } from "@testing-library/react";
import { LogoutWrapper } from ".";

jest.mock("react-router-dom");

describe("logout-wrapper", () => {
  beforeEach(async () => {
    render(
      <LogoutWrapper>
        <div></div>
      </LogoutWrapper>,
    );
  });

  it("should go to login", () => {
    expect(screen.getByTestId("logout-button")).toBeDefined();
  });
});
