import { Modal } from "@mui/material";
import { ReactNode } from "react";
import Styles from "./index.module.css";

interface Props {
  isOpen: boolean;
  children: ReactNode;
}

export const PlatformModal = (props: Props) => {
  return (
    <Modal hideBackdrop open={props.isOpen}>
      <div className={Styles.container}>
        <div className={Styles.modal}>
          {props.children}
        </div>
      </div>
    </Modal>
  );
};
