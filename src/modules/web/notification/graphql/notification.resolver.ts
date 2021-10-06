import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionTrigger } from 'src/core/enums/subscription-trigger.enum';
import { Notification } from 'src/domain/notifications/notification.type';
import { UserId } from 'src/domain/users/entities/user.entity';

type SubscriptionPayload = {
  userId: UserId;
  notification: Notification;
};

@Resolver()
export class NotificationResolver {
  constructor(private readonly _pubSub: PubSub) {}

  @Subscription()
  public notify(): AsyncIterator<SubscriptionPayload> {
    return this._pubSub.asyncIterator<SubscriptionPayload>(
      SubscriptionTrigger.NEW_NOTIFICATION,
    );
  }
}
