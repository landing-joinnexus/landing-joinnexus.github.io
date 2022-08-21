import { ButtonType } from "enums/button-type";
import Styles from "./index.module.css";

interface Props {
  onClick?: () => void;
  label: string;
  isAlternative?: boolean;
  type?: ButtonType;
  isDisabled?: boolean;
  onMouseOver?: () => void;
  onMouseLeave?: () => void;
}

export const PlatformButton = (props: Props) => {
  const className = props.isAlternative ? Styles.buttonAlternative : Styles.button;
  let action = props.onClick;
  if (props.isDisabled) {
    action = () => 0;
  }
  return (
    <button
      onMouseOver={props.onMouseOver}
      onMouseLeave={props.onMouseLeave}
      type={props.type}
      className={className}
      onClick={action}
    >
      {props.label}
    </button>
  );
};
