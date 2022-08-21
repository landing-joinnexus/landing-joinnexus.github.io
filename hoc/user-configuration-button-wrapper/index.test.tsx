import { render, screen } from "@testing-library/react";
import { UserConfigurationButtonWrapper } from ".";

jest.mock("react-router-dom");

describe("user-configuration-button-wrapper", () => {
  it("should render button", () => {
    render(<UserConfigurationButtonWrapper />);
    expect(screen.queryAllByTestId("go-to-account-button")).toHaveLength(1);
  });
});
