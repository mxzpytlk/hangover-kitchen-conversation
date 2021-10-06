import { JSObject, JsTypeMapping, JsTypeName } from 'src/core/types';
import {
  Notification,
  NotificationValue,
} from 'src/domain/notifications/notification.type';
import { UserId } from 'src/domain/users/entities/user.entity';
import { NotificationOrmEntity } from './notification.orm-entity';

type NotificationTypeMapper = {
  [key in JsTypeName]?: (value: JsTypeMapping[key]) => string;
};

export class NotificationMapper {
  private static typeMapper: NotificationTypeMapper = {
    string: (value: string) => value,
    object: (value: JSObject) => JSON.stringify(value),
  };

  public static mapToOrmEntity(
    notification: Notification<NotificationValue>,
    notificationId: string,
    userId: UserId,
  ) {
    const notificationOrm = new NotificationOrmEntity();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: any = notification.value;
    notificationOrm.notification =
      NotificationMapper.typeMapper[typeof value](value);
    notificationOrm.type = notification.type;
    notificationOrm.isRead = !!notification.isRead;
    notificationOrm.id = notificationId;
    notificationOrm.userId = userId;
    return notificationOrm;
  }
}
