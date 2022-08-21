import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import PermissionsIssues from "./permissions-issues";

jest.mock('utils/get-browser');

describe("permissions-issues", () => {
  const reload = jest.fn();
  beforeEach(async () => {
    // tslint:disable-next-line: no-any
    delete (window as any).location;
    // tslint:disable-next-line: no-any
    (window as any).location = { reload };
    render(<PermissionsIssues />);
    act(() => {
      userEvent.click(screen.getByTestId("reload-button"));
    });
  });
  it("should should allow reload", () => {
    expect(reload).toBeCalled();
  });
});
