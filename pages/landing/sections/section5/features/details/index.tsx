import features1 from "assets/icons/features/features_1.webp";
import features2 from "assets/icons/features/features_2.webp";
import features3 from "assets/icons/features/features_3.webp";
import features4 from "assets/icons/features/features_4.webp";
import features5 from "assets/icons/features/features_5.webp";
import features6 from "assets/icons/features/features_6.webp";
import whenToUse1 from "assets/icons/features/when_to_use_1.webp";
import whenToUse2 from "assets/icons/features/when_to_use_2.webp";
import whenToUse3 from "assets/icons/features/when_to_use_3.webp";
import whenToUse4 from "assets/icons/features/when_to_use_4.webp";
import whenToUse5 from "assets/icons/features/when_to_use_5.webp";
import whenToUse6 from "assets/icons/features/when_to_use_6.webp";
import { times } from "lodash";
import { useTranslation } from "react-i18next";
import { FeatureDetail } from "../feature-detail";
import Styles from "../index.module.css";

const featuresImages: Record<string, Array<string>> = {
  when_to_use: [whenToUse1, whenToUse2, whenToUse3, whenToUse4, whenToUse5, whenToUse6],
  features: [features1, features2, features3, features4, features5, features6],
};

interface Props {
  category: string;
}
export const Details = (props: Props) => {
  const { t } = useTranslation();
  const category = props.category;
  const categoryImages = featuresImages[category];
  const details = times(6).map((index: number) => (
    <FeatureDetail
      image={categoryImages[index]}
      title={t(`landing.features.${category}.options.option_${index + 1}.title`)}
      message={t(`landing.features.${category}.options.option_${index + 1}.message`)}
      key={index}
    ></FeatureDetail>
  ));

  return (
    <div
      key={`details_${category} `}
      data-testid={`details_${category} `}
      className={Styles.detailsContainer}
    >
      {details}
    </div>
  );
};