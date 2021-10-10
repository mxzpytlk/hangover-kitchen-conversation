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
    replyOn?: MessageId,
    files?: HKCFile[],
    author?: UserEntity,
  ): Promise<MessageEntity> {
    const room = await this._roomUseCase.getRoom(roomId, author);
    if (!(author || room.canSendAnonimusMessage)) {
      throw Exception.NOT_ANONIMUS_MESSAGE;
    }
    const message = await this._messageStorePort.saveMessage(
      text,
      roomId,
      replyOn,
      files,
      author?.id,
    );

    this.sendNewMessageNotifications(message, room, author);

    return message;
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
      room.id,
    );
    this._notificator.sendNotification(roomUserIds, {
      type: NotificationType.NEW_MESSAGE,
      value: notificationValue,
    });

    if (message.replyOn) {
      const replyOn = await this._messageStorePort.getMessage(message.replyOn);
      if (replyOn.authorId) {
        this._notificator.sendNotification(replyOn.authorId, {
          type: NotificationType.MESSAGE_REPLY,
          value: {
            ...notificationValue,
            replyOn: replyOn.id,
          },
        });
      }
    }
  }

  private mapMessageToNotification(
    message: MessageEntity,
    author: UserEntity,
    roomId: RoomId,
  ) {
    return {
      text: message.text,
      author: author.personalInfo,
      roomId,
    };
  }
}
