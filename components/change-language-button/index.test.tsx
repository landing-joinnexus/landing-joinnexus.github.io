import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import i18n from "lang/i18";
import ChangeLanguageButton from ".";

describe("change-language-button", () => {
  beforeEach(() => {
    render(<ChangeLanguageButton />);
  });

  describe("when a language is clicked", () => {
    let spy: jest.SpyInstance;
    beforeEach(async () => {
      spy = jest.spyOn(i18n, "changeLanguage");

      await act(async () => {
        userEvent.click(screen.getByTestId("pt"));
      });
    });

    it("expect to call change language", () => {
      expect(spy).toBeCalledWith("pt");
    });
  });
});
