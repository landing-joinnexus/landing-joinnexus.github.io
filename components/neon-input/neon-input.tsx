import { TextField, TextFieldProps } from "@mui/material";
import Styles from "./neon-input.module.css";

const NeonInput = (props: TextFieldProps) => {
  const { helperText, error } = props;

  let className = `${props.className} ${Styles.input}`;

  if (helperText && error) {
    className = `${className} ${Styles.error}`;
  }

  return <TextField variant="outlined" {...props} autoComplete="off" className={className} />;
};

export default NeonInput;
