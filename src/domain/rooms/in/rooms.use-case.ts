import { UserEntity, UserId } from 'src/domain/users/entities/user.entity';
import { RoomEntity, RoomId } from '../entities/room.entity';

export interface IRoomsUseCase {
  createRoom(
    adminId: UserId,
    title: string,
    isOpen?: boolean,
    description?: string,
  ): Promise<RoomEntity>;
  getRooms(): Promise<RoomEntity[]>;
  getRoom(id: RoomId): Promise<RoomEntity>;
  addUserToRoom(user: UserEntity, roomId: RoomId): Promise<RoomEntity>;
  letUserIn(admin: UserEntity, userId: UserId, roomId: RoomId): Promise<void>;
  kickUser(admin: UserEntity, userId: UserId, roomId: RoomId): Promise<void>;
}
