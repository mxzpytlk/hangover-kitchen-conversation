import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from 'src/domain/rooms/entities/room.entity';
import { IRoomsStorePort } from 'src/domain/rooms/out/rooms-store.port';
import { Repository } from 'typeorm';
import { RoomMapper } from '../mappers/room.mapper';
import { RoomOrmEntity } from '../orm-entities/room.orm-entity';

@Injectable()
export class RoomPersistanceAdapter implements IRoomsStorePort {
  constructor(
    @InjectRepository(RoomOrmEntity)
    private readonly _roomRepository: Repository<RoomOrmEntity>,
  ) {}

  public async getAllRooms(): Promise<RoomEntity[]> {
    const roomOrms = await this._roomRepository.find({
      relations: ['userRooms'],
    });
    return roomOrms.map(RoomMapper.mapToDOmain);
  }
  getRoom(id: string): Promise<RoomEntity> {
    throw new Error('Method not implemented.');
  }
}
