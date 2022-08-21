import { Game } from "models";
import { categoryService } from "services/category.service";
import { setGameWithCategory } from "store/game.store";
import { getGameWithCategories } from "./get-game-with-categories";

jest.mock("store/game.store", () => {
  return {
    setGameWithCategory: jest.fn(),
  };
});
jest.mock("services/category.service", () => {
  return {
    categoryService: {
      getCategoriesByGameId: jest.fn(),
    },
  };
});

describe("get-game-with-categories", () => {
  const categories = [1, 2, 3];
  beforeEach(() => {
    (categoryService.getCategoriesByGameId as jest.Mock).mockResolvedValue({ data: categories });
    (setGameWithCategory as unknown as jest.Mock).mockImplementation(data => data);
  });
  it("should dispatch categories", async () => {
    const dispatch = jest.fn();
    const game = {
      id: 1,
    };
    await getGameWithCategories(game as Game, dispatch);
    expect(dispatch).toBeCalledWith({ categories, game });
  });
});
