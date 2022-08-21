import GameCategories from "components/game-categories";
import NeonBox from "components/neon-box/neon-box";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BombSlider } from "./bomb-slider";
import { neonBoxStyle } from "./index.style";
import { StarsSlider } from "./stars-slider";
import StartGameButton from "./start-game-button";

interface Props {
  gameName: string;
  children?: React.ReactNode;
  hideCategories?: boolean;
  maxFails?: number;
  slider?: "bombs" | "stars";
  minPlayersAmount?: number;
}

const minBombs = 2;

export const GameInstructions = (props: Props) => {
  const { t } = useTranslation();
  const [maxCounter, setMaxCounter] = useState(Math.round( (minBombs + (props.maxFails || 0)) / 2));
  const { hideCategories, maxFails, minPlayersAmount } = props;
  const shouldShowMaxFails = (maxFails || 0) > 0;

  let slider;

  if (shouldShowMaxFails) {
    const sliderProps = {
      min: minBombs,
      maxFails,
      value: maxCounter,
      setValue: setMaxCounter,
    };
    slider =
      props.slider === "stars" ? <StarsSlider {...sliderProps} /> : <BombSlider {...sliderProps} />;
  }

  return (
    <section>
      <NeonBox style={neonBoxStyle}>
        <h2 className="subtitle">{t("common.instructions")}</h2>
        {props.children}
      </NeonBox>
      {slider}
      {hideCategories ?? <GameCategories />}
      <div>
        <StartGameButton
          minPlayersAmount={minPlayersAmount}
          maxCounter={maxCounter}
          hideCategories={hideCategories}
        />
      </div>
    </section>
  );
};