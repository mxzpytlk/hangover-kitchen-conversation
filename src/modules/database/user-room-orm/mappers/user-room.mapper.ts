import { RoomEntity } from 'src/domain/rooms/entities/room.entity';
import { UserRoomEntity } from 'src/domain/rooms/entities/user-room.entity';
import { UserMapper } from '../../user-orm/user.mapper';
import { UserRoomOrmEntity } from '../orm-entities/user-room.orm-entity';

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
}
