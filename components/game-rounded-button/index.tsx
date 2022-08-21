import { Tooltip } from "@mui/material";
import { ButtonType } from "enums/button-type";
import { galacticBackgrounds, GalacticColors } from "enums/galactic-backgrounds";
import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import Styles from "./index.module.css";

class Props {
  id?: string;
  background?: GalacticColors = GalacticColors.WHITE;
  label?: string;
  imageSrc?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | void;
  style?: CSSProperties;
  isRound?: boolean;
  isDisabled?: boolean;
  dataTestId?: string;
  tooltip?: string;
  className?: string;
  isSelected?: boolean;
  type?: ButtonType;
}

export const GameRoundedButton = (props: Props) => {
  let onClick = props.onClick as MouseEventHandler<HTMLButtonElement>;
  const background = props.background
    ? galacticBackgrounds[props.background]
    : galacticBackgrounds[GalacticColors.WHITE];
  if (props.isDisabled) {
    // tslint:disable-next-line: no-empty
    onClick = () => {};
  }

  const style = {
    background,
    ...(props.style || {}),
  };

  if (props.isSelected) {
    style.background = galacticBackgrounds[GalacticColors.PURPLE];
    style.color = "#FFFFFF";
  }

  if (props.isRound) {
    style.borderRadius = "100px";
  }
  let content: string | ReactElement = props.label as string;
  if (props.imageSrc) {
    content = <img alt="" className="centerContent" src={props.imageSrc} />;
  }

  const disabled = { ...(props.isDisabled ? { disabled: true } : {}) };

  const classes = [Styles.gameButton, props.className];

  if (!props.isDisabled) {
    classes.push(Styles.pointer);
  }

  const button = (
    <button
      onClick={onClick}
      style={style}
      className={classes.join(" ")}
      data-testid={props.dataTestId}
      {...disabled}
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
