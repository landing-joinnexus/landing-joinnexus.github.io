import { Tooltip } from "@mui/material";
import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import { galacticBackgrounds, GalacticColors } from "enums/galactic-backgrounds";
import Styles from "./index.module.css";

class Props {
  backgroundImage: GalacticColors = GalacticColors.BLUE;
  label?: string;
  imageSrc?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | void;
  style?: CSSProperties;
  isRound?: boolean;
  isDisabled?: boolean;
  dataTestId?: string;
  tooltip?: string;
  className?: string;
}

export const GameButton = (props: Props) => {
  let onClick = props.onClick as MouseEventHandler<HTMLButtonElement>;
  let backgroundImage = galacticBackgrounds[props.backgroundImage];
  if (props.isDisabled) {
    // tslint:disable-next-line: no-empty
    onClick = () => { };
    backgroundImage = galacticBackgrounds[GalacticColors.DISABLE];
  }
  const style = {
    backgroundImage,
    ...(props.style || {}),
  };
  if (props.isRound) {
    style.borderRadius = "100px";
  }
  let content: string | ReactElement = props.label as string;
  if (props.imageSrc) {
    content = <img alt="" className="centerContent" src={props.imageSrc} />;
  }

  const button = (
    <button
      onClick={onClick}
      style={style}
      className={`${Styles.gameButton} ${props.className}`}
      data-testid={props.dataTestId}
      {...(props.isDisabled ? { disabled: true } : {})}
    >
      {content}
    </button>
  );

  if (props.tooltip) {
    return (
      <Tooltip data-testid="tooltip" title={props.tooltip}>
        <div>{button}</div>
      </Tooltip>
    );
  }

  return button;
};
