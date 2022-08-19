import { render, screen } from "@testing-library/react";
import { useShallowEqualSelector } from "store";
import { useMessageInNeonBox } from "./use-message-in-neon-box";

jest.mock("store");

interface Props {
  questionPrefix: string;
  questionSuffix: string;
  storyUserIsTheSameUserInSession: boolean;
  userNameFormatted: string;
  storyTimePrefix?: string;
  storyTimeSuffix?: string;
}

const TestComponent = (props: Props) => {
  const messageInNeonBox = useMessageInNeonBox(
    props.questionPrefix,
    props.questionSuffix,
    props.storyUserIsTheSameUserInSession,
    props.userNameFormatted,
    props.storyTimePrefix,
    props.storyTimeSuffix,
  );
  return <label id="message">{messageInNeonBox}</label>;
};

describe("use-message-in-neon-box", () => {
  beforeEach(() => {
    (useShallowEqualSelector as jest.Mock).mockReturnValue({
      questionLanguages: [
        {
          languageId: "en",
          label: "test",
        },
      ],
    });
  });

  describe("prefix", () => {
    describe("with storyTimePrefix", () => {
      beforeEach(() => {
        render(
          <TestComponent
            questionPrefix="prefix"
            questionSuffix=""
            storyUserIsTheSameUserInSession={true}
            userNameFormatted="Coyote"
          />,
        );
      });

      it("should render message", async () => {
        const label = await screen.findAllByText(`Hey, let's tell us your story with prefix test`);
        expect(label).toBeDefined();
      });
    });

    describe("without storyTimePrefix", () => {
      beforeEach(() => {
        render(
          <TestComponent
            questionPrefix=""
            questionSuffix=""
            storyUserIsTheSameUserInSession={true}
            userNameFormatted="Coyote"
            storyTimePrefix="Story prefix"
          />,
        );
      });

      it("should render message", async () => {
        const label = await screen.findAllByText(`Story prefix test`);
        expect(label).toBeDefined();
      });
    });
  });

  describe("suffix", () => {
    describe("with suffix", () => {
      beforeEach(() => {
        render(
          <TestComponent
            questionPrefix="prefix"
            questionSuffix="suffix"
            storyUserIsTheSameUserInSession={false}
            userNameFormatted="Coyote"
          />,
        );
      });

      it("should render message", async () => {
        const label = await screen.findAllByText(
          `Coyote`,
        );
        expect(label).toBeDefined();
      });
    });

    describe('without suffix', () => {
      beforeEach(() => {
        render(
          <TestComponent
            questionPrefix="prefix"
            questionSuffix=""
            storyUserIsTheSameUserInSession={false}
            userNameFormatted="Coyote"
            storyTimeSuffix="story suffix"
          />,
        );
      });

      it("should render message", async () => {
        const label = await screen.findAllByText(
          `Coyote`,
        );
        expect(label).toBeDefined();
      });
    })
  });
});
