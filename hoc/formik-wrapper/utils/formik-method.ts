export interface FormikMethod {
  (e: React.ChangeEvent<unknown>): void;
  <T_1 = string | React.ChangeEvent<unknown>>(field: T_1): T_1 extends React.ChangeEvent<unknown>
    ? void
    : (e: string | React.ChangeEvent<unknown>) => void;
}
