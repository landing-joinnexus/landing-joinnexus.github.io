import { CircularProgress } from "@mui/material";
import { Dispatch } from "@reduxjs/toolkit";
import { GameButton } from "components";
import { GalacticColors } from "enums/galactic-backgrounds";
import { UserConfigurationButtonWrapper } from "hoc";
import { get } from "lodash";
import { Room } from "models";
import { useState } from "react";
import { TFunction, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Routing } from "routing";
import { roomService } from "services/room.service";
import { setRoomState } from "store/room.store";
import DeleteRoom from "../delete-room/delete-room";

const createNewRoom =
  (
    t: TFunction<"translation", undefined>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    dispatch: Dispatch,
    setOpenErrorDialog: React.Dispatch<React.SetStateAction<boolean>>,
    navigate: NavigateFunction,
  ) =>
  async () => {
    setLoading(true);
    try {
      const response = await roomService.createRoom();
      const room: Room = response.data;
      dispatch(setRoomState(room));
      navigate(`/${Routing.platformModule}/${Routing.platform.room}/${room.pin}`);
    } catch (e: unknown) {
      const message = get(e, "response.data.message");
      switch (message) {
        case "user_has_an_active_room":
          setOpenErrorDialog(true);
          break;
        case "upgrade_your_plan_please":
          toast.error(t("rooms.please_upgrade_your_account_to_create_a_room"));
          break;
      }
    } finally {
      setLoading(false);
    }
  };

const CreateRoom = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  let gameButton = (
    <GameButton
      dataTestId="create-room-button"
      onClick={createNewRoom(t, setLoading, dispatch, setOpenErrorDialog, navigate)}
      backgroundImage={GalacticColors.BLUE}
      label={t("rooms.create_a_room")}
    />
  );

  if (isLoading) {
    gameButton = <CircularProgress />;
  }

  return (
    <UserConfigurationButtonWrapper>
      {gameButton}
      <DeleteRoom
        createRoom={createNewRoom(t, setLoading, dispatch, setOpenErrorDialog, navigate)}
        open={openErrorDialog}
        setOpen={setOpenErrorDialog}
      />
    </UserConfigurationButtonWrapper>
  );
};

export default CreateRoom;
