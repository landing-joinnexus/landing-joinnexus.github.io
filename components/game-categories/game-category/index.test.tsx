import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useUserIsHost } from "hooks/use-user-is-host";
import { Category } from "models";
import { categoryService } from "services/category.service";
import { useShallowEqualSelector } from "store";
import GameCategory from ".";

const testCategory: Category = {
  id: 1,
  categoryLanguages: [
    {
      languageId: "en",
      label: "Test Category",
    },
  ],
};

jest.mock("store", () => {
  return {
    useShallowEqualSelector: jest.fn(),
  };
});

jest.mock("hooks/use-user-is-host", () => {
  return {
    useUserIsHost: jest.fn(),
  };
});

jest.mock("services/category.service", () => {
  return {
    categoryService: {
      unselectCategory: jest.fn(),
      selectCategory: jest.fn(),
    },
  };
});

describe("game-category", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("when is selected", () => {
    describe("when is the host", () => {
      beforeEach(async () => {
        // Arrange
        (useShallowEqualSelector as jest.Mock).mockReturnValue({
          roomPin: "123",
          categoriesSelected: [1, 2, 3],
        });
        (useUserIsHost as jest.Mock).mockReturnValue(true);
        render(<GameCategory category={testCategory} />);

        // Act
        await act(async () => {
          userEvent.click(screen.getByTestId("game-category"));
        });
      });

      it("should unselect the category", () => {
        expect(categoryService.unselectCategory).toBeCalled();
      });
    });

    describe("when is not the host", () => {
      beforeEach(async () => {
        // Arrange
        (useShallowEqualSelector as jest.Mock).mockReturnValue({
          roomPin: "123",
          categoriesSelected: [1, 2, 3],
        });
        (useUserIsHost as jest.Mock).mockReturnValue(false);
        render(<GameCategory category={testCategory} />);

        // Act
        await act(async () => {
          userEvent.click(screen.getByTestId("game-category"));
        });
      });

      it("should do nothing", () => {
        expect(categoryService.unselectCategory).not.toBeCalled();
        expect(categoryService.selectCategory).not.toBeCalled();
      });
    });
  });

  describe("when is not selected", () => {
    describe("when is the host", () => {
      beforeEach(async () => {
        // Arrange
        (useShallowEqualSelector as jest.Mock).mockReturnValue({
          roomPin: "123",
          categoriesSelected: [],
        });
        (useUserIsHost as jest.Mock).mockReturnValue(true);
        render(<GameCategory category={testCategory} />);

        // Act
        await act(async () => {
          userEvent.click(screen.getByTestId("game-category"));
        });
      });

      it("should select the category", () => {
        expect(categoryService.selectCategory).toBeCalled();
      });
    });

    describe("when is not the host", () => {
      beforeEach(async () => {
        // Arrange
        (useShallowEqualSelector as jest.Mock).mockReturnValue({
          roomPin: "123",
          categoriesSelected: [],
        });
        (useUserIsHost as jest.Mock).mockReturnValue(false);
        render(<GameCategory category={testCategory} />);

        // Act
        await act(async () => {
          userEvent.click(screen.getByTestId("game-category"));
        });
      });

      it("should do nothing", () => {
        expect(categoryService.unselectCategory).not.toBeCalled();
        expect(categoryService.selectCategory).not.toBeCalled();
      });
    });
  });
});
