import { roomService } from "services/room.service";

export const goToHomeRoom = (pin: string) => () => roomService.goToRoomHome(pin);
