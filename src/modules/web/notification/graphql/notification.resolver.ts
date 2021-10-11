import { Args, Context, Query, Resolver, Subscription } from '@nestjs/graphql';
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
import { INotificationStorePort } from 'src/domain/notifications/out/notufication-store.port';
import { WithoutProfileFullfiled } from '../../auth/decorators/without-profile-fullfiled';
import { Inject } from '@nestjs/common';
import { NotificationPersistanceAdapter } from 'src/modules/database/notification-orm/notification-persistance.adapter';

type SubscriptionPayload = {
  userId: UserId | UserId[];
  notification: Notification;
};

@Resolver()
export class NotificationResolver {
  constructor(
    private readonly _pubSub: PubSub,
    @Inject(NotificationPersistanceAdapter)
    private readonly _notificationStore: INotificationStorePort,
  ) {}

  @Query('notifications')
  @WithoutProfileFullfiled()
  public async getNotifications(
    @Context() ctx: GQLContext,
    @Args('from') from?: number,
    @Args('to') to?: number,
  ): Promise<GqlNotification[]> {
    const userId = ctx.user?.id;
    const notifications = await this._notificationStore.getNotifications(
      userId,
    );

    return notifications.slice(from, to).map(this.mapNotification);
  }

  @Subscription('notify', {
    filter(this: NotificationResolver, payload, _, ctx) {
      return this.filterSubscription(payload, ctx);
    },
    resolve(this: NotificationResolver, payload: SubscriptionPayload) {
      return this.mapNotification(payload.notification);
    },
  })
  public notify(): AsyncIterator<SubscriptionPayload> {
    return this._pubSub.asyncIterator<SubscriptionPayload>(
      SubscriptionTrigger.NEW_NOTIFICATION,
    );
  }

  private filterSubscription(payload: SubscriptionPayload, ctx: GQLContext) {
    const requisites = payload.userId;
    if (Array.isArray(requisites)) {
      return requisites.includes(ctx.user.id);
    }
    return ctx.user?.id === payload.userId;
  }

  private mapNotification(notification: Notification): GqlNotification {
    return {
      type: notification.type.toUpperCase() as GqlNotificationType,
      value: notification.value as unknown as GqlNotificationValue,
    };
  }
}
