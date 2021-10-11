import { Exception } from 'src/core/shared/exception';
import { NotificationType } from 'src/domain/notifications/notification.type';
import { INotificationPort } from 'src/domain/notifications/out/notification.port';
import { RoomEntity, RoomId } from 'src/domain/rooms/entities/room.entity';
import { IRoomsUseCase } from 'src/domain/rooms/in/rooms.use-case';
import { HKCFile } from 'src/domain/types';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { MessageEntity, MessageId } from '../entities/message.entity';
import { IMessageUseCase } from '../in/message.use-case';
import { IMessageStorePort } from '../out/message-store.port';

export const MessageServiceSymbol = Symbol('MessageService');

export class MessageService implements IMessageUseCase {
  constructor(
    private readonly _roomUseCase: IRoomsUseCase,
    private readonly _messageStorePort: IMessageStorePort,
    private readonly _notificator: INotificationPort,
  ) {}

  public async sendMessage(
    roomId: RoomId,
    text: string,
    isAnonimus: boolean,
    repliedId?: MessageId,
    files?: HKCFile[],
    sender?: UserEntity,
  ): Promise<MessageEntity> {
    if (!isAnonimus && !sender) {
      throw Exception.WRONG_AUTH_DATA;
    }
    const author = isAnonimus ? null : sender;

    const room = await this._roomUseCase.getRoom(roomId, author);
    if (!(author || room.canSendAnonimusMessage)) {
      throw Exception.NOT_ANONIMUS_MESSAGE;
    }

    if (repliedId) {
      const replied = await this._messageStorePort.getMessage(repliedId);
      if (replied?.roomId !== roomId) {
        throw Exception.NO_MESSAGE_IN_ROOM;
      }
    }

    const message = await this._messageStorePort.saveMessage(
      text,
      roomId,
      repliedId,
      files,
      author?.id,
    );

    this.sendNewMessageNotifications(message, room, author);

    return message;
  }

  public async getMessages(
    roomId: RoomId,
    user?: UserEntity,
  ): Promise<MessageEntity[]> {
    const room = await this._roomUseCase.getRoom(roomId, user);
    return room.messages;
  }

  private async sendNewMessageNotifications(
    message: MessageEntity,
    room: RoomEntity,
    author: UserEntity,
  ): Promise<void> {
    const roomUserIds = room.userWithNotificationsIds;
    const notificationValue = this.mapMessageToNotification(
      message,
      author,
      room.title,
    );
    this._notificator.sendNotification(roomUserIds, {
      type: NotificationType.NEW_MESSAGE,
      value: notificationValue,
    });

    if (message.repliedId) {
      const replied = await this._messageStorePort.getMessage(
        message.repliedId,
      );
      if (replied.authorId) {
        this._notificator.sendNotification(replied.authorId, {
          type: NotificationType.MESSAGE_REPLY,
          value: {
            ...notificationValue,
            repliedId: replied.id,
          },
        });
      }
    }
  }

  private mapMessageToNotification(
    message: MessageEntity,
    author: UserEntity,
    roomTitle: string,
  ) {
    return {
      text: message.text,
      author: author?.personalInfo,
      roomTitle,
    };
  }
}
