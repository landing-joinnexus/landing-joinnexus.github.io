import { Game } from "models";
import { Dispatch } from "react";
import { categoryService } from "services/category.service";
import { setGameWithCategory } from "store/game.store";

// tslint:disable-next-line: no-any
export const getGameWithCategories = async (game: Game, dispatch: Dispatch<any>) => {
  const response = await categoryService.getCategoriesByGameId(game.id);
  const categories = response.data;
  dispatch(setGameWithCategory({ categories, game }));
};
