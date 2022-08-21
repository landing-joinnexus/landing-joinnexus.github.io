import RocketImg from "assets/images/mockups/rocket.webp";
import { useTranslation } from "react-i18next";
import { Banner } from "../banner";

export const Section2 = () => {
  const { t } = useTranslation();

  return (
    <Banner
      title={t("landing.focus_on_human_interaction")}
      subtitle={t("landing.focus_on_human_interaction_message")}
      img={RocketImg}
    />
  );
};
