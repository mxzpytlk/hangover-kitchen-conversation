import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MessageOrmEntity } from '../../message-orm/message.orm-entity';
import { UserOrmEntity } from '../../user-orm/user.orm-entity';
import { UserRoomOrmEntity } from './user-room.orm-entity';

@Entity('rooms', {})
export class RoomOrmEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column({
    name: 'is_open',
  })
  public isOpen: boolean;

  @Column({
    name: 'can_send_anonimus_message',
  })
  public canSendAnonimusMessage: boolean;

  @Column()
  public date: Date;

  @Column()
  public limit: number;

  @OneToMany(() => UserRoomOrmEntity, (userRoom) => userRoom.room)
  public userRooms: UserRoomOrmEntity[];

  @OneToMany(() => MessageOrmEntity, (message) => message.room)
  public messages: MessageOrmEntity[];

  public get users(): UserOrmEntity[] {
    return this.userRooms?.map((userRoom) => userRoom.user);
  }
}
