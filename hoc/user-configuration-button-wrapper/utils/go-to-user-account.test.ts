import { goToUserAccount } from "./go-to-user-account";

describe("go-to-user-account", () => {
  it("should call navigate", () => {
    const navigate = jest.fn();
    goToUserAccount(navigate)();
    expect(navigate).toBeCalledWith("/platform/account");
  });
});
