import { times } from "lodash";
import { useTranslation } from "react-i18next";

export const Clues = () => {
  const { t } = useTranslation();
  return (
    <ul>
      {times(5).map((_, index) => (
        <li key={index}>{t(`who_am_i.clue_${index + 1}`)}</li>
      ))}
    </ul>
  );
};
