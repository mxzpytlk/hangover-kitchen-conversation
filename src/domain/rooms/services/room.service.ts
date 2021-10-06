import { Exception } from 'src/core/shared/exception';
import { RandomUtils } from 'src/core/utils/random.utils';
import { NotificationType } from 'src/domain/notifications/notification.type';
import { INotificationPort } from 'src/domain/notifications/out/notification.port';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { UserName } from 'src/domain/users/user.types';
import { RoomEntity, RoomId } from '../entities/room.entity';
import { UserRoomEntity } from '../entities/user-room.entity';
import { IRoomsUseCase } from '../in/rooms.use-case';
import { IRoomUserStorePort } from '../out/room-user-store.port';
import { IRoomsStorePort } from '../out/rooms-store.port';

export class RoomService implements IRoomsUseCase {
  constructor(
    private readonly _roomsStore: IRoomsStorePort,
    private readonly _roomUserStore: IRoomUserStorePort,
    private readonly _notificationPort: INotificationPort,
  ) {}

  public async createRoom(
    admin: UserEntity,
    title: string,
    isOpen = true,
    description?: string,
    limit?: number,
    canSendAnonimusMessage?: boolean,
  ): Promise<RoomEntity> {
    const roomId = RandomUtils.randomString(16);
    const room = new RoomEntity(
      roomId,
      title,
      new Date(),
      [],
      {
        admin: new UserRoomEntity(admin),
        commonUsers: [],
      },
      isOpen,
      canSendAnonimusMessage,
      limit,
      description,
    );
    return this._roomUserStore.createRoom(room);
  }

  public async getRooms(): Promise<RoomEntity[]> {
    const rooms = await this._roomsStore.getAllRooms();
    rooms.sort(this.compareRooms);
    return rooms;
  }

  public async getRoom(
    roomId: RoomId,
    receiver?: UserEntity,
    withoutVerification = false,
  ): Promise<RoomEntity> {
    const room = await this._roomsStore.getRoom(roomId);
    if (room.hasUserAcces(receiver) || withoutVerification) {
      return room;
    }
    throw Exception.PERMISSION_DENIED;
  }

  public async joinRoom(user: UserEntity, roomId: RoomId): Promise<RoomEntity> {
    const room = await this.getRoom(roomId, user, true);
    if (room.hasUser(user)) {
      return room;
    }
    if (room.isFull) {
      throw Exception.ROOM_IS_FULL;
    }
    if (room.isOpen) {
      await this._roomUserStore.addUser(room, user);
      return room;
    }
    await this._notificationPort.sendNotification(room.admin.id, {
      type: NotificationType.USER_WANT_JOIN_ROOM,
      value: {
        userName: user.name,
      },
    });
  }

  public async letUserIn(
    admin: UserEntity,
    userName: string,
    roomId: RoomId,
  ): Promise<void> {
    const room = await this.getRoom(roomId, admin);
    if (room.isFull) {
      throw Exception.ROOM_IS_FULL;
    }
    if (!room.admin.equals(admin)) {
      throw Exception.PERMISSION_DENIED;
    }
    await this._notificationPort.sendNotification(userName, {
      type: NotificationType.ROOM_ACCESS_ALOWED,
      value: {
        roomTitle: room.title,
        roomId,
      },
    });
    await this._roomUserStore.addUser(room, userName);
  }

  public async kickUser(
    admin: UserEntity,
    userName: UserName,
    roomId: RoomId,
  ): Promise<void> {
    const room = await this.getRoom(roomId, admin);
    if (userName === admin.name) {
      throw Exception.KICK_ADMIN;
    }
    if (!room.admin.equals(admin)) {
      throw Exception.PERMISSION_DENIED;
    }
    return this._roomUserStore.deleteUser(room, userName);
  }

  private compareRooms(first: RoomEntity, second: RoomEntity): number {
    return first.popularity - second.popularity;
  }
}
