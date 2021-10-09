import { RoomEntity } from 'src/domain/rooms/entities/room.entity';
import { UserRoomEntity } from 'src/domain/rooms/entities/user-room.entity';
import { UsersInRoom } from 'src/domain/rooms/room.type';
import { RoomOrmEntity } from '../orm-entities/room.orm-entity';
import { UserRoomOrmEntity } from '../orm-entities/user-room.orm-entity';
import { UserRoomMapper } from './user-room.mapper';

export class RoomMapper {
  public static mapToOrmEntity(room: RoomEntity): RoomOrmEntity {
    const roomOrm = new RoomOrmEntity();
    roomOrm.id = room.id;
    roomOrm.title = room.title;
    roomOrm.description = room.description;
    roomOrm.isOpen = room.isOpen;
    roomOrm.date = room.date;
    roomOrm.limit = room.limit;
    roomOrm.canSendAnonimusMessage = room.canSendAnonimusMessage;

    return roomOrm;
  }

  public static mapToDomain(roomOrm: RoomOrmEntity): RoomEntity {
    const users: UsersInRoom = RoomMapper.mapOrmToUsersRoomDomain(
      roomOrm.userRooms,
    );

    return new RoomEntity(
      roomOrm.id,
      roomOrm.title,
      roomOrm.date,
      [],
      users,
      roomOrm.isOpen,
      roomOrm.canSendAnonimusMessage,
      roomOrm.limit,
      roomOrm.description,
    );
  }

  private static mapOrmToUsersRoomDomain(
    userRooms: UserRoomOrmEntity[],
  ): UsersInRoom {
    if (!userRooms) {
      return {
        admin: null,
        commonUsers: [],
        waitingInvitation: [],
      };
    }
    let admin: UserRoomEntity;
    const commonUsers: UserRoomEntity[] = [];
    const usersInQueue: UserRoomEntity[] = [];
    userRooms.forEach((userRoom) => {
      const user = UserRoomMapper.mapUserToDomain(userRoom);
      if (userRoom.isAdmin) {
        admin = user;
        return;
      } else if (userRoom.isWaitingInvitation) {
        usersInQueue.push(user);
      } else {
        commonUsers.push(user);
      }
    });

    return { admin, commonUsers, waitingInvitation: usersInQueue };
  }
}
