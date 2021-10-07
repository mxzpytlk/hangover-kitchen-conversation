import { ResolveField, Resolver } from '@nestjs/graphql';
import {
  NotificationValue as GqlNotificationValue,
  RoomNotification,
  UserNotification,
} from 'src/graphql/graphql';

type NotificationValueTypeName = 'UserNotification' | 'RoomNotification';

@Resolver('NotificationValue')
export class NotificationValueResolver {
  @ResolveField()
  public __resolveType(value: GqlNotificationValue): NotificationValueTypeName {
    if (this.isUser(value)) {
      return 'UserNotification';
    }
    if (this.isRoom(value)) {
      return 'RoomNotification';
    }
    return null;
  }

  private isUser(
    notificationValue: GqlNotificationValue,
  ): notificationValue is UserNotification {
    return (notificationValue as UserNotification).userName !== undefined;
  }

  private isRoom(
    notificationValue: GqlNotificationValue,
  ): notificationValue is RoomNotification {
    return (notificationValue as RoomNotification).roomId !== undefined;
  }
}
