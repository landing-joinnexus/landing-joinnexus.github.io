import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { GalacticColors } from "enums/galactic-backgrounds";
import { GameButton } from ".";

describe("game-button", () => {
  const onClick = jest.fn();

  describe("when button is disabled", () => {
    beforeEach(async () => {
      render(
        <GameButton
          backgroundImage={GalacticColors.BLUE}
          isDisabled={true}
          onClick={() => onClick()}
          label="click me"
        />,
      );
      await act(async () => {
        userEvent.click(screen.getByText(/click me/i));
      });
    });

    it("should not execute onClick", () => {
      expect(onClick).not.toBeCalled();
    });
  });

  describe("when button is enabled", () => {
    beforeEach(async () => {
      render(
        <GameButton
          backgroundImage={GalacticColors.BLUE}
          onClick={() => onClick()}
          label="click me"
        />,
      );
      await act(async () => {
        userEvent.click(screen.getByText(/click me/i));
      });
    });

    it("should execute onClick", () => {
      expect(onClick).toBeCalled();
    });
  });

  describe("when a image is pass as parameter", () => {
    let container: HTMLElement;
    beforeEach(() => {
      const rendering = render(
        <GameButton backgroundImage={GalacticColors.BLUE} imageSrc="myImage.png" />,
      );
      container = rendering.container;
    });

    it("should execute onClick", () => {
      expect(container.getElementsByTagName("img").length).toBe(1);
    });
  });

  describe("when button is round", () => {
    let container: HTMLElement;
    beforeEach(() => {
      const rendering = render(
        <GameButton isRound={true} backgroundImage={GalacticColors.BLUE} imageSrc="myImage.png" />,
      );
      container = rendering.container;
    });

    it("should has borderRadius", () => {
      expect(container.getElementsByTagName("img").item(0)?.style.borderRadius).toBeDefined();
    });
  });

  describe("when tooltip pass", () => {
    beforeEach(() => {
      render(
        <GameButton tooltip="test" backgroundImage={GalacticColors.BLUE} imageSrc="myImage.png" />,
      );
    });

    it("should render tooltip", async () => {
      expect(await screen.findByTestId("tooltip")).toBeDefined();
    });
  });

  describe("when className pass", () => {
    beforeEach(() => {
      render(
        <GameButton className="test" backgroundImage={GalacticColors.BLUE} imageSrc="myImage.png" />,
      );
    });

    it("should render className", async () => {
      expect(screen.getByRole('button')).toHaveClass("test")
    });
  });
});
