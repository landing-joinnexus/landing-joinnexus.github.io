import NeonBox from "components/neon-box/neon-box";
import { useTranslation } from "react-i18next";

export const Title = () => {
  const { t } = useTranslation();
  return (
    <NeonBox>
    <h1 className="text">{t("think_fast.break_time")}</h1>
  </NeonBox>
  )
};
