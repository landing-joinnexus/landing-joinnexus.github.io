import { fireEvent, render, screen } from "@testing-library/react";
import { useUserIsHost } from "hooks/use-user-is-host";
import { act } from "react-dom/test-utils";
import { useSelector } from "react-redux";
import { ShareButtonWrapper } from ".";

jest.mock("hooks/use-user-is-host");
jest.mock("react-redux");

describe("share-button-wrapper", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  describe("when the user is not a host", () => {
    beforeEach(() => {
      (useUserIsHost as jest.Mock).mockReturnValue(false);
      (useSelector as jest.Mock).mockReturnValue("123");
      render(<ShareButtonWrapper />);
    });

    it("should not show modal", () => {
      expect(screen.queryAllByTestId("share-modal-container")).toHaveLength(0);
    });
  });

  describe("when the user is the host", () => {
    beforeEach(() => {
      (useUserIsHost as jest.Mock).mockReturnValue(true);
    });
    describe("when the last room shared is the current", () => {
      beforeEach(() => {
        localStorage.setItem("lastRoomPinShared", "123");
        (useSelector as jest.Mock).mockReturnValue("123");
        render(<ShareButtonWrapper />);
      });

      it("should not show modal", () => {
        expect(screen.queryAllByTestId("share-modal-container")).toHaveLength(0);
      });
    });

    describe("when the last room shared is not the current", () => {
      beforeEach(() => {
        localStorage.setItem("lastRoomPinShared", "333");
        (useSelector as jest.Mock).mockReturnValue("123");
        Object.assign(navigator, {
          clipboard: {
            writeText: jest.fn(),
          },
        });
        render(
          <ShareButtonWrapper>
            <div data-testid="outside-element"></div>
          </ShareButtonWrapper>,
        );
      });

      it("should show modal", () => {
        expect(screen.queryAllByTestId("share-modal-container")).toHaveLength(1);
      });

      describe("when the user click on share button", () => {
        beforeEach(() => {
          act(() => {
            fireEvent.click(screen.getByTestId("share-button"));
          });
          jest.runAllTicks();
        });

        it("should hide modal", () => {
          expect(screen.queryAllByTestId("share-modal-container")).toHaveLength(0);
        });
      });
    });
  });
});
