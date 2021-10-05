import { Injectable } from '@nestjs/common';
import { RoomEntity } from 'src/domain/rooms/entities/room.entity';
import { IRoomsStorePort } from 'src/domain/rooms/out/rooms-store.port';

@Injectable()
export class RoomPersistanceAdapter implements IRoomsStorePort {
  getAllRooms(): Promise<RoomEntity[]> {
    throw new Error('Method not implemented.');
  }
  getRoom(id: string): Promise<RoomEntity> {
    throw new Error('Method not implemented.');
  }
}
