import { size } from "lodash";
import { useTranslation } from "react-i18next";
import { RootState, useShallowEqualSelector } from "store";
import Styles from "./host-title.module.css";
import { SuffixImage } from "./suffix-image";

interface Props {
  show: boolean;
  userId: number;
}

const HostTitle = (props: Props) => {
  const { t } = useTranslation();
  const { counter } = useShallowEqualSelector((state: RootState) => ({
    counter: state.room.gameState?.counter,
  }));

  const counterValue = counter ? counter[Number(props.userId)] : null;

  const label = [];

  if (props.show) {
    label.push(t("common.host"));
  }

  if (counterValue) {
    label.push(`${counterValue}`);
  }

  if (size(label)) {
    return (
      <div className={props.show ? Styles.hostContainer : ""}>
        <h4 className={`neon ${Styles.host}`}>
          {label.join(" / ")}
          <SuffixImage counterValue={counterValue as number} />
        </h4>
      </div>
    );
  }
  return <div className={Styles.noHost}></div>;
};

export default HostTitle;
