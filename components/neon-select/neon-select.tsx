import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import Styles from "./neon-select.module.css";

interface Option {
  value: string | number;
  label: string;
}

interface Props extends SelectProps {
  options: Array<Option>;
  errorMessage: string;
}

const NeonSelect = (props: Props) => {
  const { options, errorMessage, className, ...selectProps } = props;
  return (
    <FormControl
      variant="outlined"
      className={`${className} ${Styles.input}`}
      error={props.error as boolean}
    >
      <InputLabel id={`${selectProps.id}-label`}>{props.label}</InputLabel>
      <Select {...selectProps}>
        {options.map((subject: Option) => (
          <MenuItem key={`item_${subject.value}`} value={subject.value}>
            {subject.label}
          </MenuItem>
        ))}
      </Select>
      {props.error ? <FormHelperText>{errorMessage}</FormHelperText> : null}
    </FormControl>
  );
};

export default NeonSelect;
