import { JSObject } from 'src/core/types';

export enum NotificationType {
  ACOUNT_ACTIVATION = 'acount_activation',
  USER_WANT_JOIN_ROOM = 'user_want_join_room',
  ROOM_ACCESS_ALOWED = 'room_access_allowed',
  NEW_MESSAGE = 'new_message',
  MESSAGE_REPLY = 'message_reply',
  UNKNOWN = 'unknown',
}

export type NotificationValue = JSObject | string;

export type Notification<T extends NotificationValue = NotificationValue> = {
  type: NotificationType;
  value?: T;
  isRead?: boolean;
};
