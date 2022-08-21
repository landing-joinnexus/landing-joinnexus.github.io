import { CategoryLanguage } from "./category-language.model";

export interface Category {
  id: number;
  categoryLanguages: Array<CategoryLanguage>;
}
