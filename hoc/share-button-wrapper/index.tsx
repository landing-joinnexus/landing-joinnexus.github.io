import { Box, ClickAwayListener, Modal } from "@mui/material";
import { GameButton } from "components";
import { useUserIsHost } from "hooks/use-user-is-host";
import { useState } from "react";
import { TFunction, useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "store";
import { GalacticColors } from "enums/galactic-backgrounds";
import Styles from "./index.module.css";
import ShareIcon from "assets/icons/platform/share.svg";

interface Props {
  children?: React.ReactNode;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #FFFFFF",
  p: 4,
};

const shareLink =
  (t: TFunction<"translation", undefined>, setOpen: (open: boolean) => void) => async () => {
    const url = window.location.href;
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
    }
    setOpen(false);
    toast.success(t("common.link_copied_to_the_clipboard"));
  };

export const ShareButtonWrapper = (props: Props) => {
  const lastRoomPinShared = localStorage.getItem("lastRoomPinShared");
  const { t } = useTranslation();
  const isHost = useUserIsHost();
  const roomPin = useSelector((state: RootState) => state.room.pin);
  const shouldShowShareModal = isHost && roomPin !== lastRoomPinShared;
  const [open, setOpen] = useState(shouldShowShareModal);

  localStorage.setItem("lastRoomPinShared", roomPin as string);

  return (
    <>
      {props.children}
      <div data-testid="share-button-container" className={Styles.buttonContainer}>
        <GameButton
          dataTestId="share-button"
          onClick={shareLink(t, setOpen)}
          backgroundImage={GalacticColors.BLUE}
          isRound={true}
          imageSrc={ShareIcon}
        />
      </div>

      <Modal open={open}>
        <Box sx={style} className={Styles.container}>
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div data-testid="share-modal-container">
              <h2 className="neon">{t("common.invite_your_teammates_to_the_party")}</h2>
              <GameButton
                dataTestId="share-modal-button"
                onClick={shareLink(t, setOpen)}
                backgroundImage={GalacticColors.BLUE}
                label={t("common.share_link")}
              />
            </div>
          </ClickAwayListener>
        </Box>
      </Modal>
    </>
  );
};
