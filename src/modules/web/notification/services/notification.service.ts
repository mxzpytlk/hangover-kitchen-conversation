import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionTrigger } from 'src/core/enums/subscription-trigger.enum';
import { INotificationPort } from 'src/domain/notifications/out/notification.port';
import { Notification } from 'src/domain/notifications/notification.type';
import { UserId } from 'src/domain/users/entities/user.entity';
import { INotificationStorePort } from 'src/domain/notifications/out/notufucation-store.port';

export const NotificationServiceSymbol = Symbol('NotificationService');

@Injectable()
export class NotificationService implements INotificationPort {
  constructor(
    private readonly _pubSub: PubSub,
    private readonly _notificationStorePort: INotificationStorePort,
  ) {}

  public async sendNotification(
    userId: UserId,
    notification: Notification,
  ): Promise<void> {
    this._notificationStorePort.saveNotification(notification, userId);
    this._pubSub.publish(SubscriptionTrigger.NEW_NOTIFICATION, {
      userId,
      notification,
    });
  }
}
