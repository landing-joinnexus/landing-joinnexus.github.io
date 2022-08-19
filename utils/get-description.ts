import { i18n as i18nClass } from "i18next";
import { sanitizeLanguage } from "lang/i18";
import { QuestionImageDescription } from "models/question-image-description";

export const getDescription = (
  questionLanguages: Array<QuestionImageDescription> | undefined,
  i18n: i18nClass,
) => {
  const currentLanguage = sanitizeLanguage(i18n.language);
  return questionLanguages?.find(ql => ql.languageId === currentLanguage)?.description;
};
