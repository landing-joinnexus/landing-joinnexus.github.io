import Styles from "./neon-button.module.css";

interface Props {
  label: string;
  id?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const NeonButton = (props: Props) => {
  const { label, className, ...properties } = props;
  return (
    <button {...properties} className={`${className} ${Styles.button}`}>
      {label}
    </button>
  );
};

export default NeonButton;
