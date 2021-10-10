import { MessageEntity } from 'src/domain/message/entities/message.entity';
import { RoomId } from 'src/domain/rooms/entities/room.entity';
import { FileMapper } from '../file-orm/file.mapper';
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
    const files = messageOrm.files.map(FileMapper.mapToDomain);
    return new MessageEntity(
      messageOrm.id,
      messageOrm.text,
      messageOrm.date,
      messageOrm.repliedId,
      files,
      messageOrm.authorId,
    );
  }
}
