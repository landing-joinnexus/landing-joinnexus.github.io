import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useStoryUserIsTheSameUserInSession } from "hooks/story-user-is-the-same-user-in-session";
import { useShallowEqualSelector } from "store";
import { ShowUserInStoryTime } from ".";

const nextStep = jest.fn();

jest.mock("store");
jest.mock("hooks/story-user-is-the-same-user-in-session");

describe("show-user-in-story-time", () => {
  const rendering = () =>
    render(<ShowUserInStoryTime nextStep={nextStep} questionPrefix={""} questionSuffix={""} />);
  beforeEach(() => {
    (useShallowEqualSelector as jest.Mock).mockReturnValue({
      roomPin: "1",
      userForStoryTime: 1,
      usersDetails: {
        "1": {
          name: "Coyote",
        },
      },
      usersForStoryTime: [1, 2],
    });
  });

  describe("when is loading", () => {
    beforeEach(() => {
      rendering();
    });
    it("should show progressbar", async () => {
      expect(await screen.findByRole("progressbar")).toBeDefined();
    });
  });

  describe("after 10 seconds", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    describe("if is the same user in session", () => {
      beforeEach(async () => {
        // Assert
        (useStoryUserIsTheSameUserInSession as jest.Mock).mockReturnValue(true);
        rendering();
        act(() => {
          jest.runAllTimers();
        })

        // Act
        await act(async () => {
          userEvent.click(screen.getByText(/Pass turn/i));
        });
      });

      it("should be able to click button", () => {
        // Assert
        expect(nextStep).toBeCalled();
      });
    });
  });
});
