import { MessageEntity } from 'src/domain/message/entities/message.entity';
import { RoomId } from 'src/domain/rooms/entities/room.entity';
import { FileMapper } from '../file-orm/file.mapper';
import { UserMapper } from '../user-orm/user.mapper';
import { MessageOrmEntity } from './message.orm-entity';

export class MessageMapper {
  public static mapToOrm(
    message: MessageEntity,
    roomId: RoomId,
  ): MessageOrmEntity {
    const messageOrm = new MessageOrmEntity();
    messageOrm.id = message.id;
    messageOrm.text = message.text;
    messageOrm.date = message.date;
    messageOrm.authorId = message.authorId;
    messageOrm.roomId = roomId;
    messageOrm.repliedId = message.repliedId;

    return messageOrm;
  }

  public static mapToDomain(messageOrm: MessageOrmEntity): MessageEntity {
    if (!messageOrm) {
      return null;
    }
    const files = messageOrm.files?.map(FileMapper.mapToDomain);
    const message = new MessageEntity(
      messageOrm.id,
      messageOrm.text,
      messageOrm.date,
      messageOrm.roomId,
      messageOrm.repliedId,
      files || [],
      messageOrm.authorId,
    );
    const author = UserMapper.mapToDomain(messageOrm.author);
    message.author = author;

    return message;
  }
}
