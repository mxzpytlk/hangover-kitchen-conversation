import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionTrigger } from 'src/core/enums/subscription-trigger.enum';
import { Notification } from 'src/domain/notifications/notification.type';
import { INotificationPort } from 'src/domain/notifications/out/notification.port';

export const NotificationSubscriptionSymbol = Symbol(
  'SubscriptionNotificationService',
);

@Injectable()
export class SubscriptionNotificationService implements INotificationPort {
  constructor(private readonly _pubSub: PubSub) {}

  public async sendNotification(
    requisites: string | string[],
    notification: Notification,
  ): Promise<void> {
    this._pubSub.publish(SubscriptionTrigger.NEW_NOTIFICATION, {
      requisites,
      notification,
    });
  }
}
