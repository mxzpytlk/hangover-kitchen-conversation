import { UserEntity, UserId } from 'src/domain/users/entities/user.entity';
import { RoomEntity } from '../entities/room.entity';

export interface IRoomUserStorePort {
  addUser(room: RoomEntity, user: UserEntity | UserId): Promise<void>;
  deleteUser(room: RoomEntity, userId: UserId): Promise<void>;
}
