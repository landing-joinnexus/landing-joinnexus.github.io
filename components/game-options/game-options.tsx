import { sanitizeLanguage } from "lang/i18";
import { QuestionOption } from "models";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "store";
import GameOption from "./game-option/game-option";

const renderOption = (language: string, ignoreIsPositive?: boolean) => (option: QuestionOption) => {
  const currentLanguage = sanitizeLanguage(language);
  const label = option.optionLanguages.find(ol => ol.languageId === currentLanguage)?.label;
  return (
    <GameOption
      key={`option_${option.id}`}
      id={option.id}
      isPositive={option?.isPositive || !!ignoreIsPositive}
      label={label as string}
    />
  );
};

interface Props {
  ignoreIsPositive?: boolean;
}

const GameOptions = (props: Props) => {
  const { i18n } = useTranslation();
  const options = useSelector((state: RootState) => state.room.gameState?.question?.options);
  const positiveOptions = (options || []).filter(option => option.isPositive);
  const negativeOptions = (options || []).filter(option => !option.isPositive);

  return (
    <div>
      {[...negativeOptions, ...positiveOptions]
        .map(renderOption(i18n.language, props.ignoreIsPositive))}
    </div>
  );
};

export default GameOptions;
