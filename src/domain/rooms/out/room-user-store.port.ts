import { UserEntity, UserId } from 'src/domain/users/entities/user.entity';
import { UserName } from 'src/domain/users/user.types';
import { RoomEntity } from '../entities/room.entity';

export interface IRoomUserStorePort {
  saveRoom(room: RoomEntity): Promise<RoomEntity>;
  addUser(room: RoomEntity, user: UserEntity | UserName): Promise<void>;
  deleteUser(room: RoomEntity, userName: UserName): Promise<void>;
  getRoomsBelongUser(userId: UserId): Promise<RoomEntity[]>;
}
