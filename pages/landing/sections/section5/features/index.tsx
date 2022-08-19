
import { GameRoundedButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { TRANSLATION_EN } from "lang/en";
import { keys } from "lodash";
import { useState } from "react";
import { TFunction, useTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import { Details } from "./details";
import Styles from "./index.module.css";

export const Features = () => {
  const { t } = useTranslation();
  const featuresCategories = keys(TRANSLATION_EN.landing.features);
  const [value, setValue] = useState(0);

  const renderButton =
    // tslint:disable-next-line:no-shadowed-variable
    (t: TFunction<"translation", undefined>, activeTab: number) =>
      (category: string, index: number) =>
      (
        <GameRoundedButton
          label={t(`landing.features.${category}.label`)}
          key={`details_${category}`}
          onClick={() => setValue(index)}
          background={GalacticColors.WHITE}
          isSelected={activeTab === index}
        />
      );

  return (
    <div className={Styles.featuresContainer}>
      <div className={Styles.featuresCategories}>
        {featuresCategories.map(renderButton(t, value))}
      </div>
      <br />
      <SwipeableViews key="test" index={value}>
        {featuresCategories.map((category => (
          <Details key={category} category={category} />
        )))}
      </SwipeableViews>
    </div>
  );
};