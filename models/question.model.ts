import { QuestionImage } from "./question-image.model";
import { QuestionLanguage } from "./question-language";
import { QuestionOption } from "./question-option.model";

export interface Question {
  id: number;
  questionLanguages: Array<QuestionLanguage>;
  options: Array<QuestionOption>;
  questionImages: Array<QuestionImage>;
}
