import { UserEntity, UserId } from 'src/domain/users/entities/user.entity';
import { RoomEntity, RoomId } from '../entities/room.entity';

export const RoomServiceSymbol = Symbol('RoomService');

export interface IRoomsUseCase {
  createRoom(
    admin: UserEntity,
    title: string,
    isOpen?: boolean,
    description?: string,
    limit?: number,
    canSendAnonimusMessage?: boolean,
  ): Promise<RoomEntity>;
  getRooms(): Promise<RoomEntity[]>;
  getRoom(id: RoomId, receiver?: UserEntity): Promise<RoomEntity>;
  joinRoom(user: UserEntity, roomId: RoomId): Promise<RoomEntity>;
  letUserIn(admin: UserEntity, userId: UserId, roomId: RoomId): Promise<void>;
  kickUser(admin: UserEntity, userId: UserId, roomId: RoomId): Promise<void>;
}
