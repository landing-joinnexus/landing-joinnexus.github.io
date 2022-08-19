import { Chip } from "@mui/material";
import { galacticBackgrounds, GalacticColors } from "enums/galactic-backgrounds";
import { useUserIsHost } from "hooks/use-user-is-host";
import { sanitizeLanguage } from "lang/i18";
import { Category } from "models";
import { CSSProperties } from "react";
import { TFunction, useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { categoryService } from "services/category.service";
import { RootState, useShallowEqualSelector } from "store";
import Styles from "./index.module.css";

interface Props {
  category: Category;
}

const changeCategoryStatus =
  (
    isHost: boolean,
    categoryId: number,
    roomPin: string,
    isSelected: boolean,
    hostName: string,
    t: TFunction<"translation", undefined>,
  ) =>
  () => {
    if (!isHost) {
      const message = t("common.only_the_host_can_select_a_category").replace("host", hostName);
      toast.success(message);
      return;
    }
    if (isSelected) {
      categoryService.unselectCategory(roomPin, categoryId);
    } else {
      categoryService.selectCategory(roomPin, categoryId);
    }
  };

const GameCategory = ({ category }: Props) => {
  const { categoriesSelected, roomPin, hostname } = useShallowEqualSelector((state: RootState) => ({
    roomPin: state.room.pin,
    categoriesSelected: state.room.categories,
    hostname: state.room.hostUsername,
  }));
  const { t, i18n } = useTranslation();
  const isHost = useUserIsHost();

  const currentLanguage = sanitizeLanguage(i18n.language);

  const categoryLanguage = category.categoryLanguages.find(cl => cl.languageId === currentLanguage);
  const label = categoryLanguage?.label;

  const isSelected = categoriesSelected.includes(category.id);

  let outlinedStyle = Styles.outlinedChip;
  const style: CSSProperties = {
    background: galacticBackgrounds[GalacticColors.DISABLE],
  };

  if (isSelected) {
    outlinedStyle = "";
    style.background = galacticBackgrounds[GalacticColors.BLUE];
  }

  const classes = [Styles.chip, outlinedStyle];
  if (isHost) {
    classes.push(Styles.chipWithCounter);
  }

  return (
    <div
      data-testid="game-category"
      onClick={changeCategoryStatus(
        isHost,
        category.id,
        roomPin as string,
        isSelected,
        hostname as string,
        t,
      )}
    >
      <Chip
        className={classes.join(" ")}
        style={style}
        label={label}
        variant={isSelected ? "filled" : "outlined"}
      />
    </div>
  );
};

export default GameCategory;
