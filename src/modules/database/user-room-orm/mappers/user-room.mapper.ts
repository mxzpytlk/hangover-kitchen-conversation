import { RoomEntity, RoomId } from 'src/domain/rooms/entities/room.entity';
import { UserRoomEntity } from 'src/domain/rooms/entities/user-room.entity';
import { UserMapper } from '../../user-orm/user.mapper';
import { UserRoomOrmEntity } from '../orm-entities/user-room.orm-entity';
import { RoomMapper } from './room.mapper';

export class UserRoomMapper {
  public static mapToOrm(
    user: UserRoomEntity,
    room: RoomEntity,
    id: string,
  ): UserRoomOrmEntity {
    const userRoom = new UserRoomOrmEntity();

    userRoom.id = id;
    userRoom.userId = user.id;
    userRoom.roomId = room.id;

    userRoom.isAdmin = room.admin.equals(user);
    userRoom.isNotificationsOn = user.isNotificationsOn;

    return userRoom;
  }

  public static mapUserToDomain(userRoom: UserRoomOrmEntity): UserRoomEntity {
    return new UserRoomEntity(
      UserMapper.mapToDomain(userRoom.user),
      userRoom.isNotificationsOn,
    );
  }

  public static mapUserToOrm(
    user: UserRoomEntity,
    room: RoomEntity,
  ): UserRoomOrmEntity {
    const userRoomOrm = new UserRoomOrmEntity();
    userRoomOrm.roomId = room.id;
    const userOrm = UserMapper.mapToOrmEntity(user.user);
    userRoomOrm.user = userOrm;
    userRoomOrm.isWaitingInvitation = room.isUserWaitInvitation(user.user);
    userRoomOrm.isNotificationsOn = user.isNotificationsOn;

    return userRoomOrm;
  }

  public static mapToRoomDomainArr(
    userRooms: UserRoomOrmEntity[],
  ): RoomEntity[] {
    const rooms = new Map<RoomId, RoomEntity>();
    for (const userRoom of userRooms) {
      const roomId = userRoom.roomId;
      if (rooms.has(userRoom.roomId)) {
        const room = rooms.get(roomId);
        const user = UserMapper.mapToDomain(userRoom.user);
        room.addUser(
          new UserRoomEntity(user, userRoom.isNotificationsOn),
          userRoom.isAdmin,
        );
      } else {
        const room = RoomMapper.mapToDomain(userRoom.room);
        rooms.set(roomId, room);
      }
    }

    return Array.from(rooms.values());
  }
}
