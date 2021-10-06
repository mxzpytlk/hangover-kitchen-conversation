import { JSObject } from 'src/core/types';
import { Notification, NotificationValue } from '../notification.type';

export interface INotificationPort<T extends NotificationValue = JSObject> {
  sendNotification(
    requisites: string,
    notification: Notification<T>,
  ): Promise<void>;
}
