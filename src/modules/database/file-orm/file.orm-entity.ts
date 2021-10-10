import { FileType } from 'src/domain/types';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { MessageOrmEntity } from '../message-orm/message.orm-entity';

@Entity('files')
export class FileOrmEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public type: FileType;

  @Column({
    name: 'message_id',
  })
  public messageId: string;

  @ManyToOne(() => MessageOrmEntity, (message) => message.files)
  @JoinColumn({
    name: 'messageId',
  })
  public message: MessageOrmEntity;
}
