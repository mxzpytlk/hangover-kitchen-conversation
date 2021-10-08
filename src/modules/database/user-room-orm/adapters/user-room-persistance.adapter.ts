import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RandomUtils } from 'src/core/utils/random.utils';
import { RoomEntity } from 'src/domain/rooms/entities/room.entity';
import { UserRoomEntity } from 'src/domain/rooms/entities/user-room.entity';
import { IRoomUserStorePort } from 'src/domain/rooms/out/room-user-store.port';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { Repository } from 'typeorm';
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

  public async saveRoom(room: RoomEntity): Promise<RoomEntity> {
    const roomSaveResult = await this._roomRepository.save(room);
    const createdRoom = RoomMapper.mapToDomain(roomSaveResult);
    const admin = room.admin;
    const adminOrm = UserRoomMapper.mapUserToOrm(admin, createdRoom);
    adminOrm.isAdmin = true;
    roomSaveResult.userRooms = [adminOrm];

    const userRoom = UserRoomMapper.mapToOrm(
      new UserRoomEntity(admin.user),
      createdRoom,
      RandomUtils.randomString(16),
    );

    await this._userRoomRepository.save(userRoom);
    return createdRoom;
  }

  public async addUser(
    room: RoomEntity,
    user: string | UserEntity,
  ): Promise<void> {
    const userEntity =
      typeof user === 'string' ? new UserEntity(user, null, null, null) : user;

    const userRoom = UserRoomMapper.mapToOrm(
      new UserRoomEntity(userEntity),
      room,
      RandomUtils.randomString(16),
    );

    await this._userRoomRepository.save(userRoom);
  }

  public async getRoomsBelongUser(userId: string): Promise<RoomEntity[]> {
    const userRooms = await this._userRoomRepository.find({
      where: {
        userId,
        isAdmin: true,
      },
      relations: ['room'],
    });
    return userRooms?.map((userRoom) => RoomMapper.mapToDomain(userRoom.room));
  }

  public async setIsWaiting(
    roomId: string,
    userId: string,
    isWaitingInvitation: boolean,
  ): Promise<void> {
    await this._userRoomRepository.update(
      {
        roomId,
        userId,
      },
      {
        isWaitingInvitation,
      },
    );
  }

  deleteUser(room: RoomEntity, userName: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
