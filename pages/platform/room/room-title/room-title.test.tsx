import { render, screen } from "@testing-library/react";
import { Room } from "models";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "store";
import { setRoomState } from "store/room.store";
import { setUser } from "store/user.store";
import RoomTitle from "./room-title";

describe("rooms-title", () => {
  const fakerRoom = {
    hostUserId: 1,
    hostUsername: 'Mr bean',
  };

  const RenderScreen = () => (
    <Provider store={store}>
      <BrowserRouter>
        <RoomTitle />
      </BrowserRouter>
    </Provider>
  );

  beforeEach(() => {
    store.dispatch(setRoomState(fakerRoom as Room));
  })

  describe("when user is host", () => {
    beforeEach(() => {
      const fakerUser = {
        id: 1,
      };
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

    it("should render create room button", async () => {
      const createRoomButton = screen.getByText(/choose a game/i);
      expect(createRoomButton).toBeInTheDocument();;
    });
  });

  describe("when user is not host", () => {
    beforeEach(() => {
      const fakerUser = {
        id: 2,
      };
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

    it("should render create room button", async () => {
      const createRoomButton = screen.getByText(/waiting for/i);
      expect(createRoomButton).toBeInTheDocument();;
    });
  });

});
