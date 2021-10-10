import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { FileOrmEntity } from '../file-orm/file.orm-entity';

@Entity('messages')
export class MessageOrmEntity {
  @PrimaryColumn()
  public id: string;

  @Column()
  public text: string;

  @Column({
    name: 'room_id',
  })
  public roomId: string;

  @Column({
    name: 'user_id',
  })
  public authorId: string;

  @Column()
  public date: Date;

  @Column({
    name: 'replied_id',
  })
  public repliedId: string;

  @OneToOne(() => MessageOrmEntity)
  @JoinColumn({
    name: 'repliedId',
    referencedColumnName: 'id',
  })
  public repliedMessage: MessageOrmEntity;

  @OneToMany(() => FileOrmEntity, (file) => file.message)
  public files: FileOrmEntity[];
}
