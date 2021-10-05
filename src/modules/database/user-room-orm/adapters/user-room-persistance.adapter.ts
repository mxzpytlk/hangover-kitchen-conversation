import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RandomUtils } from 'src/core/utils/random.utils';
import { RoomEntity } from 'src/domain/rooms/entities/room.entity';
import { UserRoomEntity } from 'src/domain/rooms/entities/user-room.entity';
import { IRoomUserStorePort } from 'src/domain/rooms/out/room-user-store.port';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '../../user-orm/user.mapper';
import { RoomMapper } from '../mappers/room.mapper';
import { UserRoomMapper } from '../mappers/user-room.mapper';
import { RoomOrmEntity } from '../orm-entities/room.orm-entity';
import { UserRoomOrmEntity } from '../orm-entities/user-room.orm-entity';

@Injectable()
export class UserRoomPersistanceAdapter implements IRoomUserStorePort {
  constructor(
    @InjectRepository(RoomOrmEntity)
    private readonly _roomRepository: Repository<RoomOrmEntity>,
    @InjectRepository(UserRoomOrmEntity)
    private readonly _userRoomRepository: Repository<UserRoomOrmEntity>,
  ) {}

  public async createRoom(
    admin: UserEntity,
    title: string,
    isOpen?: boolean,
    description?: string,
    limit?: number,
    canSendAnonimusMessage?: boolean,
  ): Promise<RoomEntity> {
    const roomId = RandomUtils.randomString(16);
    const room = RoomMapper.mapToOrmEntity(
      new RoomEntity(
        roomId,
        title,
        new Date(),
        [],
        null,
        isOpen,
        canSendAnonimusMessage,
        limit,
        description,
      ),
    );
    const roomSaveResult = await this._roomRepository.save(room);
    const adminRoomOrm = new UserRoomOrmEntity();
    adminRoomOrm.userId = admin.id;
    adminRoomOrm.roomId = roomSaveResult.id;
    adminRoomOrm.isAdmin = true;
    adminRoomOrm.user = UserMapper.mapToOrmEntity(admin);

    roomSaveResult.userRooms = [adminRoomOrm];

    const createdRoom = RoomMapper.mapToDOmain(roomSaveResult);

    const userRoom = UserRoomMapper.mapToOrm(
      new UserRoomEntity(admin, true),
      createdRoom,
      RandomUtils.randomString(16),
    );

    await this._userRoomRepository.save(userRoom);
    return createdRoom;
  }

  addUser(room: RoomEntity, user: string | UserEntity): Promise<void> {
    throw new Error('Method not implemented.');
  }

  deleteUser(room: RoomEntity, userName: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
