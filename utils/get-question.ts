import { i18n as i18nClass } from "i18next";
import { sanitizeLanguage } from "lang/i18";
import { QuestionLanguage } from "models";

export const getQuestion = (
  questionLanguages: Array<QuestionLanguage> | undefined,
  i18n: i18nClass,
) => {
  const currentLanguage = sanitizeLanguage(i18n.language);
  return questionLanguages?.find(ql => ql.languageId === currentLanguage)?.label;
};
