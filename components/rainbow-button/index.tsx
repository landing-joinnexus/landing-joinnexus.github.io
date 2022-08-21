import Styles from "./index.module.css";
/* eslint-disable */

interface Props {
  label?: string;
  onClick?: unknown;
  isDisabled?: boolean;
}

export const RainbowButton = (props: Props) => {
  const classes = [Styles.rainbowButton];
  let onClick = props.onClick;
  
  if (props.isDisabled) {
    classes.push(Styles.disabled);
    onClick = null;
  }

  return (
    <a
      onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      className={classes.join(" ")}
      about={props.label}
    ></a>
  );
};
