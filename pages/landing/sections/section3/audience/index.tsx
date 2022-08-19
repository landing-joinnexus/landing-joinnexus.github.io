import MarsImg from "assets/images/mars.webp";
import { TRANSLATION_EN } from "lang/en";
import { keys } from "lodash";
import { useTranslation } from "react-i18next";
import Styles from "./index.module.css";

export const Audience = () => {
  const { t } = useTranslation();
  const sections = keys(TRANSLATION_EN.landing.audience.options);

  return (
    <div>
      <div className={`${Styles.title}`}>{t("landing.audience.title")}</div>
      <ul className={Styles.sectionsList}>
        {sections.map((section, key) => (
          <li className={Styles.section} key={key}>
            <div>
              <img className={Styles.mars} width={50} alt="mars" src={MarsImg} />
            </div>
            <div className={Styles.audienceText}>
              <b>{t(`landing.audience.options.${section}.title`)}<br></br></b>
              <p className={Styles.audienceMessageText}>
                {t(`landing.audience.options.${section}.message`)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
