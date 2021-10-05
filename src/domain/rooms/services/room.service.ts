import { Exception } from 'src/core/shared/exception';
import { INotificationPort } from 'src/domain/notifications/out/notification.port';
import { UserEntity, UserId } from 'src/domain/users/entities/user.entity';
import { UserName } from 'src/domain/users/user.types';
import { RoomEntity, RoomId } from '../entities/room.entity';
import { IRoomsUseCase } from '../in/rooms.use-case';
import { IRoomUserStorePort } from '../out/room-user-store.port';
import { IRoomsStorePort } from '../out/rooms-store.port';

export class RoomService implements IRoomsUseCase {
  constructor(
    private readonly _roomsStore: IRoomsStorePort,
    private readonly _roomUserStore: IRoomUserStorePort,
    /**
     * Оповещает админа о новых пользователях.
     */
    private readonly _newUserNotificator: INotificationPort<UserEntity>,
    private readonly _roomEntryNotificator: INotificationPort<RoomEntity>,
  ) {}

  public async createRoom(
    admin: UserEntity,
    title: string,
    isOpen = true,
    description?: string,
    limit?: number,
    canSendAnonimusMessage?: boolean,
  ): Promise<RoomEntity> {
    return this._roomUserStore.createRoom(
      admin,
      title,
      isOpen,
      description,
      limit,
      canSendAnonimusMessage,
    );
  }

  public async getRooms(): Promise<RoomEntity[]> {
    const rooms = await this._roomsStore.getAllRooms();
    rooms.sort(this.compareRooms);
    return rooms;
  }

  public async getRoom(
    roomId: RoomId,
    receiver?: UserEntity,
  ): Promise<RoomEntity> {
    const room = await this._roomsStore.getRoom(roomId);
    if (room.hasUserAcces(receiver)) {
      return room;
    }
    throw Exception.PERMISSION_DENIED;
  }

  public async joinRoom(user: UserEntity, roomId: RoomId): Promise<RoomEntity> {
    const room = await this.getRoom(roomId, user);
    if (room.isFull) {
      throw Exception.ROOM_IS_FULL;
    }
    if (room.isOpen) {
      await this._roomUserStore.addUser(room, user);
      return room;
    }
    await this._newUserNotificator.sendNotification(room.admin.id, user);
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
    await this._roomEntryNotificator.sendNotification(userName, room);
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
