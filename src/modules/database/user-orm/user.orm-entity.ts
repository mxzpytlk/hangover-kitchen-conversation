import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { NotificationOrmEntity } from '../notification-orm/notification.orm-entity';
import { TokenOrmEntity } from '../token-orm/token.orm-entity';
import { RoomOrmEntity } from '../user-room-orm/orm-entities/room.orm-entity';
import { UserRoomOrmEntity } from '../user-room-orm/orm-entities/user-room.orm-entity';

@Entity('users', {})
export class UserOrmEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public email: string;

  @Column({
    name: 'activation_link',
  })
  public activationLink: string;

  @Column()
  public password: string;

  @Column({
    name: 'is_activated',
  })
  public isActivated: boolean;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @OneToMany(() => TokenOrmEntity, (token) => token.user)
  public tokens: TokenOrmEntity[];

  @OneToMany(() => UserRoomOrmEntity, (userRoom) => userRoom.user)
  public userRooms: UserRoomOrmEntity[];

  @OneToMany(() => NotificationOrmEntity, (notification) => notification.user)
  public notifications: NotificationOrmEntity[];

  public get rooms(): RoomOrmEntity[] {
    return this.userRooms?.map((userRoom) => userRoom.room);
  }
}
