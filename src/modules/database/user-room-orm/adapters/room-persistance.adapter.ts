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
    return roomOrms.map(RoomMapper.mapToDomain);
  }

  public async getRoom(id: string): Promise<RoomEntity> {
    const roomOrm = await this._roomRepository.findOne(id, {
      relations: ['userRooms', 'userRooms.user'],
    });
    return RoomMapper.mapToDomain(roomOrm);
  }
}
