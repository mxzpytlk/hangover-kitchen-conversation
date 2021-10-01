import { UserId } from 'src/domain/users/entities/user.entity';
import { RoomEntity, RoomId } from '../entities/room.entity';

export interface IRoomsStore {
  createRoom(
    adminId: UserId,
    title: string,
    isOpen?: boolean,
    description?: string,
  ): RoomEntity;
  getAllRooms(): Promise<RoomEntity[]>;
  getRoom(id: RoomId): Promise<RoomEntity>;
}
