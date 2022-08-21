import { UserLicenseAssignment } from "models";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { planService } from "services";
import { get } from "lodash";
import { toast } from "react-toastify";
import { PlatformModal } from "components";
import { DesactivateWarning } from "./desactivate-warning";

interface Props {
  assignment: UserLicenseAssignment;
  loadUsers?: () => void;
}

const ITEM_HEIGHT = 48;

export const ActionsColumn = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const message = props.assignment.active ? t("common.inactivate") : t("common.activate");

  const updateStatus = async () => {
    const newState = !props.assignment.active;
    await planService.updateActiveUserLicenseAssignment(props.assignment.toUser.id, newState);
    handleClose();
    if (props.loadUsers) {
      await props.loadUsers();
    }
  }

  const changeAssignmentStatus = async () => {
    const isActive = props.assignment.active;
    if (isActive) {
      setIsOpen(true);
      return;
    }
    try {
      await updateStatus();
      return;
    } catch (e) {
      const errorMessage = get(e, "response.data.message");
      toast.error(t(errorMessage));
    }

  };

  return (
    <div>
      <IconButton aria-label="more" onClick={handleClick}>
        <MoreIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem onClick={changeAssignmentStatus}>{message}</MenuItem>
      </Menu>
      <PlatformModal isOpen={isOpen}>
        <DesactivateWarning onClick={updateStatus} handleClose={handleClose} user={props.assignment.toUser} />
      </PlatformModal>
    </div>
  );
};
