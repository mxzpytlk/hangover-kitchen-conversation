import { RoomId } from 'src/domain/rooms/entities/room.entity';
import { HKCFile } from 'src/domain/types';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { MessageEntity, MessageId } from '../entities/message.entity';

export interface IMessageUseCase {
  sendMessage(
    roomId: RoomId,
    text: string,
    replyOn?: MessageId,
    files?: HKCFile[],
    sender?: UserEntity,
  ): Promise<MessageEntity>;
}
