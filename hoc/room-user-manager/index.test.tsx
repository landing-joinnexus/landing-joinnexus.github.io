import { render } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import useWebSocket from "react-use-websocket";
import { useShallowEqualSelector } from "store";
import { RoomUserManager } from ".";

jest.mock("store");
jest.mock("react-use-websocket");
jest.mock("react-redux");
jest.mock("react-router");

describe("room-user-manager", () => {
  const sendMessage = jest.fn();
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
  });

  describe("when a dependency is not ready", () => {
    beforeEach(() => {
      (useShallowEqualSelector as jest.Mock).mockReturnValue({
        roomPin: "123",
        userId: 1,
        userName: "Bruce",
      });

      (useWebSocket as jest.Mock).mockReturnValue({
        sendMessage,
        lastMessage: null,
        readyState: false,
      });

      render(<RoomUserManager />);
    });

    it("should not send a message", () => {
      expect(sendMessage).not.toBeCalled();
    });
  });

  describe("when all dependencies are ready", () => {
    beforeEach(() => {
      (useShallowEqualSelector as jest.Mock).mockReturnValue({
        roomPin: "123",
        userId: 1,
        userName: "Bruce",
      });

      (useWebSocket as jest.Mock).mockReturnValue({
        sendMessage,
        lastMessage: null,
        readyState: true,
      });

      render(<RoomUserManager />);
    });

    it("should send a message", () => {
      expect(sendMessage).toBeCalled();
    });
  });

  describe("when last message is update room", () => {
    beforeEach(() => {
      (useShallowEqualSelector as jest.Mock).mockReturnValue({
        roomPin: "123",
        userId: 1,
        userName: "Bruce",
      });

      (useWebSocket as jest.Mock).mockReturnValue({
        sendMessage,
        lastMessage: {
          data: JSON.stringify({
            event: "update-room",
          }),
        },
        readyState: true,
      });

      (useDispatch as jest.Mock).mockReturnValue(dispatch);

      render(<RoomUserManager />);
    });

    it("should dispatch", () => {
      expect(dispatch).toBeCalled();
    });
  });

  describe("when last message is room deleted", () => {
    beforeEach(() => {
      (useShallowEqualSelector as jest.Mock).mockReturnValue({
        roomPin: "123",
        userId: 1,
        userName: "Bruce",
      });

      (useWebSocket as jest.Mock).mockImplementation((_url, options) => {
        options.shouldReconnect();
        return {
          sendMessage,
          lastMessage: {
            data: JSON.stringify({
              event: "room_deleted",
            }),
          },
          readyState: true,
        }
      });

      (useDispatch as jest.Mock).mockReturnValue(dispatch);

      render(<RoomUserManager />);
    });

    it("should dispatch", () => {
      expect(dispatch).toBeCalled();
    });
  });
});
