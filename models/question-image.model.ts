import { QuestionImageDescription } from "./question-image-description";

export interface QuestionImage {
  url: string;
  sequence: number;
  questionImageDescriptions: Array<QuestionImageDescription>;
}
