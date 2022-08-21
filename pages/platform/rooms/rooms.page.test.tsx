import { render, screen } from "@testing-library/react";
import Faker from "faker";
import "lang/i18";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "store";
import { setUser } from "store/user.store";
import RoomsPage from "./rooms.page";

jest.mock("react-owl-carousel", () => {
  return {
    __esModule: true,
    default: () => {
      return <div></div>;
    },
  };
});

const now = new Date().toISOString();

describe("rooms-page", () => {
  const fakerUser = {
    id: 1,
    name: Faker.name.findName(),
    accessToken: Faker.random.alphaNumeric(12),
    createdAt: now,
    lastLoginAt: now,
    picture: Faker.internet.url(),
    updatedAt: now,
  };

  const RenderScreen = () => (
    <Provider store={store}>
      <BrowserRouter>
        <RoomsPage />
      </BrowserRouter>
    </Provider>
  );

  describe("when user has plan", () => {
    beforeEach(() => {
      store.dispatch(
        setUser({
          ...fakerUser,
          plan: {
            maxUsersPerRoom: 10,
          },
        }),
      );
      render(<RenderScreen />);
    });

    it("should render create room button", () => {
      expect(screen.getByTestId('create-room-button')).toBeDefined();
    });
  });
});
