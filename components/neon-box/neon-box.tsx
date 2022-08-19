import { CSSProperties } from "react";
import Styles from "./neon-box.module.css";

interface Props {
  children?: React.ReactNode;
  style?: CSSProperties;
  className?: string;
}

const NeonBox = (props: Props) => (
  <div
    data-testid="neon-box"
    style={props.style}
    className={`${Styles.neonBox} ${props.className}`}
  >
    {props.children}
  </div>
);

export default NeonBox;
