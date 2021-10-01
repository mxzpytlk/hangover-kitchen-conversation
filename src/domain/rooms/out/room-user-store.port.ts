import { UserEntity, UserName } from 'src/domain/users/entities/user.entity';
import { RoomEntity } from '../entities/room.entity';

export interface IRoomUserStorePort {
  addUser(room: RoomEntity, user: UserEntity | UserName): Promise<void>;
  deleteUser(room: RoomEntity, userName: UserName): Promise<void>;
}
