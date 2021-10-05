import { RoomEntity, RoomId } from '../entities/room.entity';

export interface IRoomsStorePort {
  getAllRooms(): Promise<RoomEntity[]>;
  getRoom(id: RoomId): Promise<RoomEntity>;
}
