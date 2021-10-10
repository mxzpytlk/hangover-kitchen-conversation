import { UserRoomEntity } from './entities/user-room.entity';

export type UsersInRoom = {
  commonUsers: UserRoomEntity[];
  waitingInvitation: UserRoomEntity[];
  admin: UserRoomEntity;
};
