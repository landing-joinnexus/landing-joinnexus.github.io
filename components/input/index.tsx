import { TextField } from '@mui/material';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import Styles from "./index.module.css";

interface IReactHookFormTextFieldProps {
  label: string;
  name: string;
  className?: string;
  [props: string]: unknown;
}

export const NexusInput: FC<IReactHookFormTextFieldProps> = ({ label, name, ...props }: IReactHookFormTextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const hasErrors = !!errors[name];
  const helperText = errors[name]?.message ?? '';
  return (
    <TextField
      label={label}
      variant="outlined"
      className={`${props.className} ${Styles.input}`}
      error={hasErrors}
      helperText={`${helperText}`}
      fullWidth
      margin="dense"
      {...register(name)}
      {...props}
    />
  );
};
