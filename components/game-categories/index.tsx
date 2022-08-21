import { CircularProgress } from "@mui/material";
import NeonBox from "components/neon-box/neon-box";
import { size } from "lodash";
import { Category } from "models";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { neonBoxStyle } from "styles/neonbox-style";
import Styles from "./index.module.css";
import GameCategory from "./game-category";

const renderCategories = () => (category: Category) => {
  return <GameCategory key={`category_${category.id}`} category={category} />;
};

const GameCategories = () => {
  const { t } = useTranslation();
  const categories = useSelector((state: RootState) => state.game.categories);
  let content = <CircularProgress data-testid="loading" />;

  if (size(categories)) {
    content = (
      <div className={Styles.categoriesContainer}>{categories?.map(renderCategories())}</div>
    );
  }
  return (
    <NeonBox style={neonBoxStyle}>
      <h2 className="subtitle">{t("common.categories")}</h2>
      {content}
    </NeonBox>
  );
};

export default GameCategories;
