import { defaultLanguage, sanitizeLanguage } from "./i18";

describe("i18", () => {
  describe("sanitizeLanguage", () => {
    it("should sanitize languages", () => {
      expect(sanitizeLanguage("pt-br")).toBe("pt");
    });

    it("should return default value", () => {
      expect(sanitizeLanguage("unexpected")).toBe(defaultLanguage);
    });
  });
});
