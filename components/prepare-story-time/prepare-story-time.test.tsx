import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as Faker from "faker";
import { Room, User } from "models";
import { Provider } from "react-redux";
import { store } from "store";
import { setRoomState } from "store/room.store";
import { setUser } from "store/user.store";
import PrepareStoryTime from "./prepare-story-time";

jest.mock('components/video-players/video-players', () => {
  return {
    __esModule: true,
    default: () => {
      return <div></div>;
    },
  }
});


describe("prepare-story-time", () => {
  let container: HTMLElement;
  let startStoryTime: (roomPin: string) => void;

  const RenderScreen = () => (
    <Provider store={store}>
      <PrepareStoryTime startStoryTime={startStoryTime}/>
    </Provider>
  );

  const room: Partial<Room> = {
    gameId: 1,
    pin: "123312",
    hostUserId: 1,
    hostUsername: Faker.name.firstName(),
  };

  beforeEach(() => {
    store.dispatch(setRoomState(room as Room));
    startStoryTime = jest.fn();
  });

  describe("when is not the host", () => {
    beforeEach(() => {
      const user: Partial<User> = {
        id: 2,
      };
      store.dispatch(setUser(user as User));
      const screen = render(<RenderScreen />);
      container = screen.container;
    });

    it("should have a button disabled", () => {
      const buttons = container.getElementsByTagName("button");
      const button = buttons.item(0);
      expect(button?.disabled).toBeTruthy();
    });
  });

  describe("when is the host", () => {
    beforeEach(async () => {
      const user: Partial<User> = {
        id: 1,
      };
      store.dispatch(setUser(user as User));
      const screen = render(<RenderScreen  />);
      container = screen.container;
        // Act
        await act(async () => {
          userEvent.click(screen.getByText('Continue'));
        });
    });

    it("should have a button enable", () => {
      expect(startStoryTime).toBeCalled();
    });
  });
});
