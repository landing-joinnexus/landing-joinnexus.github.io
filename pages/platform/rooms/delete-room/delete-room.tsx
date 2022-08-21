import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useTranslation } from "react-i18next";
import { roomService } from "services/room.service";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  createRoom: () => Promise<void>;
}

const DeleteRoom = (props: Props) => {
  const { t } = useTranslation();

  const recreateRoom = async () => {
    await roomService.deleteRoom();
    await props.createRoom();
    props.setOpen(false);
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>{t("errors.user_has_an_active_room")}</DialogTitle>
      <DialogActions>
        <Button onClick={() => props.setOpen(false)}>{t("common.no")}</Button>
        <Button onClick={recreateRoom} autoFocus>
          {t("common.yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteRoom;
