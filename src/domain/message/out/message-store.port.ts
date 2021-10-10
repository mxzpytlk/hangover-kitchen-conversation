import { RoomId } from 'src/domain/rooms/entities/room.entity';
import { HKCFile } from 'src/domain/types';
import { UserId } from 'src/domain/users/entities/user.entity';
import { MessageEntity, MessageId } from '../entities/message.entity';

export interface IMessageStorePort {
  saveMessage(
    text: string,
    roomId: RoomId,
    repliedId?: MessageId,
    files?: HKCFile[],
    senderId?: UserId,
  ): Promise<MessageEntity>;
  getMessage(id: MessageId): Promise<MessageEntity>;
}
