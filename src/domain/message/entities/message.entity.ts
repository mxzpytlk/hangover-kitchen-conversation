import { HKCFile } from 'src/domain/types';
import { UserId } from 'src/domain/users/entities/user.entity';

export type MessageId = string | null;

export class MessageEntity {
  constructor(
    private readonly _id: MessageId,
    private readonly _text: string,
    private readonly _date: Date,
    private readonly _replyOn?: MessageId,
    private readonly _files?: HKCFile[],
    private readonly _authorId?: UserId,
  ) {}

  public get id(): MessageId {
    return this._id;
  }

  public get text(): string {
    return this._text;
  }

  public get date(): Date {
    return this._date;
  }

  public get replyOn(): MessageId {
    return this._replyOn;
  }

  public get authorId(): UserId {
    return this._authorId;
  }

  public get files(): HKCFile[] {
    return [...this._files];
  }
}
