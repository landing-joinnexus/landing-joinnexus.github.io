import { ChildrenProps, FormikMethod } from "./utils";

interface Props {
  formik: {
    values: Record<string, unknown>;
    touched: Record<string, unknown>;
    errors: Record<string, unknown>;
    handleChange: FormikMethod;
  };
  name: string;
  children: (props: ChildrenProps) => void;
}

export const FormikWrapper = (props: Props) => {
  const { formik, name } = props;
  return (
    <>
      {props.children({
        value: formik.values[name],
        onChange: formik.handleChange,
        error: formik.touched[name] && Boolean(formik.errors[name]),
        helperText: formik.touched[name] && formik.errors[name],
      })}
    </>
  );
};
