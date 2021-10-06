import { UserId } from 'src/domain/users/entities/user.entity';
import { Notification } from '../notification.type';

export interface INotificationStorePort {
  saveNotification(notification: Notification, userId: UserId): Promise<void>;
}
