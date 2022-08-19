import { Slider } from "@mui/material";
import NeonBox from "components/neon-box/neon-box";
import Styles from "./index.module.css";

interface Props {
  maxFails?: number;
  value?: number;
  setValue: (value: number) => void;
  min: number;
  color: string;
  image: string;
  title: string;
}

const marks = [
  {
    value: 2,
    label: "2",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 10,
    label: "10",
  },
];

export const GenericSlider = (props: Props) => {
  const { value, setValue, min } = props;
  return (
    <NeonBox className={Styles.box}>
      <h2 className="subtitle">{props.title}</h2>
      <div className={Styles.container} style={{ color: props.color }}>
        <img className={Styles.bomb} src={props.image} alt={"element"} />
        <p>{value}</p>
      </div>
      <Slider
        style={{ color: props.color }}
        valueLabelDisplay="auto"
        marks={marks}
        min={min}
        max={props.maxFails}
        step={1}
        value={value}
        onChange={(_, val) => setValue(val as number)}
      />
    </NeonBox>
  );
};
