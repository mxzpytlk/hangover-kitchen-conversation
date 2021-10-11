import { RoomId } from 'src/domain/rooms/entities/room.entity';
import { HKCFile } from 'src/domain/types';
import { UserEntity, UserId } from 'src/domain/users/entities/user.entity';

export type MessageId = string | null;

export class MessageEntity {
  private _author: UserEntity;

  constructor(
    private readonly _id: MessageId,
    private readonly _text: string,
    private readonly _date: Date,
    private readonly _roomId: RoomId,
    private readonly _repliedId?: MessageId,
    private readonly _files: HKCFile[] = [],
    private readonly _authorId?: UserId,
  ) {}

  public get id(): MessageId {
    return this._id;
  }

  public get text(): string {
    return this._text;
  }

  public get roomId(): RoomId {
    return this._roomId;
  }

  public get date(): Date {
    return this._date;
  }

  public get repliedId(): MessageId {
    return this._repliedId;
  }

  public get authorId(): UserId {
    return this._authorId;
  }

  public get files(): HKCFile[] {
    return [...this._files];
  }

  public set author(author: UserEntity) {
    if (author && author?.id !== this.authorId) {
      throw new Error(
        `Set incorrect author (id = ${author.id}) in message (id = ${this.id})`,
      );
    }
    this._author = author;
  }

  public get author(): UserEntity {
    return this._author;
  }
}
