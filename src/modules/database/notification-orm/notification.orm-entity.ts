import { NotificationType } from 'src/domain/notifications/notification.type';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserOrmEntity } from '../user-orm/user.orm-entity';

@Entity('notifications')
export class NotificationOrmEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public notification: string;

  @Column({
    name: 'user_id',
  })
  public userId: string;

  @Column()
  public type: NotificationType;

  @Column({
    name: 'is_read',
  })
  public isRead: boolean;

  @ManyToOne(() => UserOrmEntity, (user) => user.notifications)
  @JoinColumn({
    name: 'user_id',
  })
  public user: UserOrmEntity;
}
