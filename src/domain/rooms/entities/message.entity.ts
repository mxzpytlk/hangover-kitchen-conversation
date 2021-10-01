import { MessageType, MessageValue } from '../room.type';

export class MessageEntity {
  constructor(
    private readonly _value: MessageValue,
    private readonly _type: MessageType,
    private readonly _date: Date,
  ) {}

  public get date(): Date {
    return new Date(this._date);
  }
}
