import { UserEntity } from 'src/domain/users/entities/user.entity';
import { UserName } from 'src/domain/users/user.types';
import { RoomEntity } from '../entities/room.entity';

export interface IRoomUserStorePort {
  createRoom(
    admin: UserEntity,
    title: string,
    isOpen?: boolean,
    description?: string,
    limit?: number,
    canSendAnonimusMessage?: boolean,
  ): Promise<RoomEntity>;
  addUser(room: RoomEntity, user: UserEntity | UserName): Promise<void>;
  deleteUser(room: RoomEntity, userName: UserName): Promise<void>;
}
