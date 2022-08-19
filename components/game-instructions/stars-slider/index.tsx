import StarImage from "assets/images/star.webp";
import { useTranslation } from "react-i18next";
import { GenericSlider } from "../generic-slider";

interface Props {
  maxFails?: number;
  value?: number;
  setValue: (value: number) => void;
  min: number;
}

export const StarsSlider = (props: Props) => {
  const { t } = useTranslation();
  return (
    <GenericSlider
      {...props}
      title={t("common.select_max_stars_amount")}
      image={StarImage}
      color="#ffee58"
    />
  );
};
