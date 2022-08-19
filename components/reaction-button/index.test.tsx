import { render } from "@testing-library/react";
import ReactionButton from ".";
import { Reactions } from "enums/reactions";
import { useShallowEqualSelector } from "store";

jest.mock("store");
describe("reaction-button", () => {
  const rendering = () =>
    render(<ReactionButton reaction={Reactions.AMAZED} displayCounter={true}></ReactionButton>);
  beforeEach(() => {
    (useShallowEqualSelector as jest.Mock).mockReturnValue({
      roomPin: "1",
      userForStoryTime: 1,
      votes: {
        1: "laugh",
        19: "laugh"
      },
      reactions: {
        19: {
          amazed: 2,
          laugh: 2
        },
        1: {
          amazed: 2,
          laugh: 2
        }
      }
    });
  });

  const onClick = jest.fn();
  describe("when counter should be shown ", () => {
    beforeEach(() => {
      rendering();
    });
    it("should not execute onClick", () => {
      expect(onClick).not.toBeCalled();
    });
  });
});