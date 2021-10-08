import { Exception } from 'src/core/shared/exception';
import { RandomUtils } from 'src/core/utils/random.utils';
import { NotificationType } from 'src/domain/notifications/notification.type';
import { INotificationPort } from 'src/domain/notifications/out/notification.port';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { IUserStorePort } from 'src/domain/users/out/user-store.port';
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
        waitingInvitation: [],
      },
      isOpen,
      canSendAnonimusMessage,
      limit,
      description,
    );
    return this._roomUserStore.saveRoom(room);
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
    if (room.isUserWaitInvitation(user)) {
      throw Exception.ALREADY_TRY_JOIN;
    }
    if (room.isCLose) {
      room.addUserInQueue(user);
    }
    await this._roomUserStore.addUser(room, user);
    if (room.isOpen) {
      return room;
    }
    await this._notificationPort.sendNotification(room.admin.id, {
      type: NotificationType.USER_WANT_JOIN_ROOM,
      value: {
        userName: user.name,
      },
    });
  }

  public async getWaitingUsers(
    receiver: UserEntity,
    roomId: RoomId,
  ): Promise<UserEntity[]> {
    const room = await this.getRoom(roomId, receiver);
    if (!room?.isAdmin(receiver)) {
      throw Exception.NOT_ADMIN;
    }
    return room.waitingUsers;
  }

  public async letUserIn(
    receiver: UserEntity,
    userName: string,
    roomId: RoomId,
  ): Promise<void> {
    const room = await this.getRoom(roomId, receiver);
    if (room.isFull) {
      throw Exception.ROOM_IS_FULL;
    }
    if (!room.isAdmin(receiver)) {
      throw Exception.PERMISSION_DENIED;
    }
    const user = room.waitingUsers.find((user) => user.name === userName);
    if (!user) {
      throw Exception.USER_NOT_JOIN_ROOM;
    }
    await this._roomUserStore.setIsWaiting(room.id, user.id, false);
    this._notificationPort.sendNotification(user.id, {
      type: NotificationType.ROOM_ACCESS_ALOWED,
      value: {
        roomTitle: room.title,
        roomId,
      },
    });
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

  public async getRoomsBelongUser(user: UserEntity): Promise<RoomEntity[]> {
    return this._roomUserStore.getRoomsBelongUser(user.id);
  }

  private compareRooms(first: RoomEntity, second: RoomEntity): number {
    return first.popularity - second.popularity;
  }
}
