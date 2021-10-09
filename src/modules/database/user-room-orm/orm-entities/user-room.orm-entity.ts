import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserOrmEntity } from '../../user-orm/user.orm-entity';
import { RoomOrmEntity } from './room.orm-entity';

@Entity('user_rooms', {})
export class UserRoomOrmEntity {
  @PrimaryColumn()
  public id: string;

  @Column({
    name: 'room_id',
  })
  public roomId: string;

  @Column({
    name: 'user_id',
  })
  public userId: string;

  @Column({
    name: 'is_admin',
  })
  public isAdmin: boolean;

  @Column({
    name: 'is_notifications_on',
  })
  public isNotificationsOn: boolean;

  @Column({
    name: 'is_waiting_invitation',
  })
  public isWaitingInvitation: boolean;

  @ManyToOne(() => RoomOrmEntity, (room) => room.userRooms)
  @JoinColumn({
    name: 'room_id',
    referencedColumnName: 'id',
  })
  public room: RoomOrmEntity;

  @ManyToOne(() => UserOrmEntity, (user) => user.userRooms)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  public user: UserOrmEntity;
}
