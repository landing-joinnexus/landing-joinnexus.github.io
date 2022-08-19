import { roomService } from "services/room.service";
import { goToHomeRoom } from "./go-to-home-room";

jest.mock('services/room.service');

describe('go-to-home-room', () => {
  it('should call goToRoom', () => {
    const spy = jest.spyOn(roomService, 'goToRoomHome');
    goToHomeRoom('pin123')();
    expect(spy).toBeCalledWith('pin123');
  })
})