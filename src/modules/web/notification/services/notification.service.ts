import { Injectable } from '@nestjs/common';
import { INotificationPort } from 'src/domain/notifications/out/notification.port';
import {
  Notification,
  NotificationType,
} from 'src/domain/notifications/notification.type';
import { UserId } from 'src/domain/users/entities/user.entity';
import { INotificationStorePort } from 'src/domain/notifications/out/notufication-store.port';
import { SubscriptionNotificationService } from './subscription-notification.service';

export const NotificationServiceSymbol = Symbol('NotificationService');

@Injectable()
export class NotificationWebService implements INotificationPort {
  private readonly NOT_SAVED_NOTIFICATIONS = [
    NotificationType.ACOUNT_ACTIVATION,
    NotificationType.NEW_MESSAGE,
  ];

  constructor(
    private readonly _notificationStorePort: INotificationStorePort,
    private readonly _notificationSubscription: SubscriptionNotificationService,
  ) {}

  public async sendNotification(
    userId: UserId,
    notification: Notification,
  ): Promise<void> {
    if (!this.NOT_SAVED_NOTIFICATIONS.includes(notification.type)) {
      this._notificationStorePort.saveNotification(notification, userId);
    }
    this._notificationSubscription.sendNotification(userId, notification);
  }
}
