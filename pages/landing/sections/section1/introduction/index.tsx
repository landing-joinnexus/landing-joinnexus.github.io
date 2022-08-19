import { GameRoundedButton } from "components";
import { useTranslation } from "react-i18next";
import Styles from "./index.module.css";
import { TypingEffect } from "./typingEffect";

interface Props {
  // tslint:disable-next-line: no-any
  resultRef: any;
}

export const Introduction = (props: Props) => {
  const { t } = useTranslation();
  const resultRef = props.resultRef;

  const subtitles = [
    t("landing.subtitle_1_1"),
    t("landing.subtitle_1_2"),
    t("landing.subtitle_1_3"),
  ];
  const typingEffectSubtitles = TypingEffect(subtitles);

  return (
    <div className={`column ${Styles.content}`}>
      <div className={`${Styles.title}`}>{t("landing.title")}</div>
      <div className={`${Styles.subtitle} ${Styles.blinkingCursor}`}>
        {t("landing.subtitle_1")} {typingEffectSubtitles}
      </div>
      <div className={`${Styles.introductionFooter}`}>
        <GameRoundedButton
          label={t("landing.join_nexus")}
          onClick={() => resultRef.current.scrollIntoView({ behavior: "smooth" })}
          className={Styles.button}
        />
        <div className={`${Styles.contact}`}>{t("landing.contact_us")}</div>
      </div>
    </div>
  );
};
