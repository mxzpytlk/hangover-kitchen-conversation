import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RandomUtils } from 'src/core/utils/random.utils';
import { MessageEntity } from 'src/domain/message/entities/message.entity';
import { IMessageStorePort } from 'src/domain/message/out/message-store.port';
import { HKCFile } from 'src/domain/types';
import { Repository } from 'typeorm';
import { UserPersistenceAdapter } from '../user-orm/user-persistance.adapter';
import { MessageMapper } from './message.mapper';
import { MessageOrmEntity } from './message.orm-entity';

@Injectable()
export class MessagePersistanceAdapter implements IMessageStorePort {
  constructor(
    @InjectRepository(MessageOrmEntity)
    private readonly _messageRepository: Repository<MessageOrmEntity>,
    private readonly _userPersistanceAdapter: UserPersistenceAdapter,
  ) {}

  public async saveMessage(
    text: string,
    roomId: string,
    repliedId?: string,
    files: HKCFile[] = [],
    authorId?: string,
  ): Promise<MessageEntity> {
    const messageId = RandomUtils.randomString(16);
    const message = new MessageEntity(
      messageId,
      text,
      new Date(),
      roomId,
      repliedId,
      files,
      authorId,
    );
    const messageOrm = MessageMapper.mapToOrm(message, roomId);
    await this._messageRepository.save(messageOrm);
    if (authorId) {
      const author = await this._userPersistanceAdapter.getUserById(authorId);
      message.author = author;
    }
    return message;
  }

  public async getMessage(id: string): Promise<MessageEntity> {
    const message = await this._messageRepository.findOne(id, {
      relations: ['repliedMessage', 'files', 'author'],
    });
    return MessageMapper.mapToDomain(message);
  }
}
