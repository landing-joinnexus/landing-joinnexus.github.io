import { logout } from "./logout";

describe('logout', () => {
  it("should redirect to login", () => {
    const navigate = jest.fn();
    logout(navigate)();
    expect(navigate).toBeCalledWith("/login");
  });
})