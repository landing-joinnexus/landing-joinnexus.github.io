import RocketImg from "assets/images/mockups/meteors.webp";
import { useTranslation } from "react-i18next";
import { Banner } from "../banner";

export const Section6 = () => {
  const { t } = useTranslation();

  return (
    <Banner
      title={t("landing.future")}
      subtitle={t("landing.focus_on_human_interaction_message")}
      img={RocketImg}
    />
  );
};
