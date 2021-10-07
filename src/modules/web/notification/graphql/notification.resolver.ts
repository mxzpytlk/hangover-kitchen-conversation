import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionTrigger } from 'src/core/enums/subscription-trigger.enum';
import { Notification } from 'src/domain/notifications/notification.type';
import { UserId } from 'src/domain/users/entities/user.entity';
import {
  Notification as GqlNotification,
  NotificationType as GqlNotificationType,
  NotificationValue as GqlNotificationValue,
} from 'src/graphql/graphql';
import { GQLContext } from 'src/core/types';

type SubscriptionPayload = {
  userId: UserId;
  notification: Notification;
};

@Resolver()
export class NotificationResolver {
  constructor(private readonly _pubSub: PubSub) {}

  @Subscription('notify', {
    filter(this: NotificationResolver, payload, _, ctx) {
      return this.filterSubscription(payload, ctx);
    },
    resolve(this: NotificationResolver, payload) {
      return this.resolveSubscriptionInput(payload);
    },
  })
  public notify(): AsyncIterator<SubscriptionPayload> {
    return this._pubSub.asyncIterator<SubscriptionPayload>(
      SubscriptionTrigger.NEW_NOTIFICATION,
    );
  }

  private filterSubscription(payload: SubscriptionPayload, ctx: GQLContext) {
    return ctx.user?.id === payload.userId;
  }

  private resolveSubscriptionInput(
    payload: SubscriptionPayload,
  ): GqlNotification {
    const notification = payload.notification;
    return {
      type: notification.type.toUpperCase() as GqlNotificationType,
      value: notification.value as unknown as GqlNotificationValue,
    };
  }
}
