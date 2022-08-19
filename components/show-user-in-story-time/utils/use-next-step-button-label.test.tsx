import { render, screen } from "@testing-library/react";
import { useNextStepButtonLabel } from "./use-next-step-button-label";

jest.mock("store");

interface Props {
  hasANextUser: boolean;
  storyUserIsTheSameUserInSession: boolean;
  userNameFormatted: string;
}

const TestComponent = (props: Props) => {
  const messageInNeonBox = useNextStepButtonLabel(
    props.storyUserIsTheSameUserInSession,
    props.userNameFormatted,
  );
  return <label id="message">{messageInNeonBox}</label>;
};

describe("use-next-step-button-label", () => {
  describe("storyUserIsTheSameUserInSession is false", () => {
    beforeEach(() => {
      render(
        <TestComponent
          hasANextUser={false}
          storyUserIsTheSameUserInSession={false}
          userNameFormatted={"coyote"}
        />,
      );
    });

    it("should render message", async () => {
      const label = await screen.findAllByText(`Waiting for coyote to continue`);
      expect(label).toBeDefined();
    });
  });

  describe("has a next user", () => {
    beforeEach(() => {
      render(
        <TestComponent
          hasANextUser={true}
          storyUserIsTheSameUserInSession={true}
          userNameFormatted={"coyote"}
        />,
      );
    });

    it("should render message", async () => {
      const label = await screen.findAllByText(`Pass turn`);
      expect(label).toBeDefined();
    });
  });

  describe("is the last storyteller", () => {
    beforeEach(() => {
      render(
        <TestComponent
          hasANextUser={false}
          storyUserIsTheSameUserInSession={true}
          userNameFormatted={"coyote"}
        />,
      );
    });

    it("should render message", async () => {
      const label = await screen.findAllByText(`Pass turn`);
      expect(label).toBeDefined();
    });
  });
});
