import BombImage from "assets/images/bomb.webp";
import { useTranslation } from "react-i18next";
import { GenericSlider } from "../generic-slider";

interface Props {
  maxFails?: number;
  value?: number;
  setValue: (value: number) => void;
  min: number;
}

export const BombSlider = (props: Props) => {
  const { t } = useTranslation();
  return (
    <GenericSlider
      {...props}
      title={t("common.select_max_bombs_amount")}
      image={BombImage}
      color="#1EE260"
    />
  );
};
