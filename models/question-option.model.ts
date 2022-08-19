import { OptionLanguage } from "./option-language.model";

export interface QuestionOption {
  isPositive: boolean;
  id: number;
  optionLanguages: Array<OptionLanguage>;
}
