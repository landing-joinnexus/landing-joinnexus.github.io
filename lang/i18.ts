import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { head, keys, split, toLower } from "lodash";
import { initReactI18next } from "react-i18next";
import { languageResources } from "./languages";

export const defaultLanguage = "en";

export const sanitizeLanguage = (language: string) => {
  const transformLanguage = toLower(head(split(language, "-")));
  if (!keys(languageResources).includes(transformLanguage)) {
    return defaultLanguage;
  }
  return transformLanguage;
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: languageResources,
    fallbackLng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
