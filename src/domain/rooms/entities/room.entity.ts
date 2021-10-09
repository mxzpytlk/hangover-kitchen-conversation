import { DateUtils } from 'src/core/utils/date.utils';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { UsersInRoom } from '../room.type';
import { MessageEntity } from './message.entity';
import { UserRoomEntity } from './user-room.entity';

export type RoomId = string;

export class RoomEntity {
  constructor(
    private readonly _id: RoomId,
    private readonly _title: string,
    private readonly _date: Date,
    private readonly _messages: MessageEntity[],
    private readonly _users: UsersInRoom,
    private readonly _isOpen = true,
    private readonly _canSendAnonimusMessage = true,
    private readonly _limit?: number,
    private readonly _description?: string,
  ) {}

  public get id(): RoomId {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string {
    return this._description;
  }

  public get isOpen(): boolean {
    return this._isOpen;
  }

  public get isCLose(): boolean {
    return !this.isOpen;
  }

  public get canSendAnonimusMessage(): boolean {
    return this._canSendAnonimusMessage;
  }

  public get date(): Date {
    return this._date;
  }

  public get limit(): number {
    return this._limit;
  }

  public get users(): UserRoomEntity[] {
    return [this._users.admin, ...this._users.commonUsers];
  }

  public get popularity(): number {
    const usersCount = this.users.length;
    const generalPopularity = this._messages.reduce(
      (prev, cur) => prev + this.getMessagePopularity(cur),
      usersCount,
    );
    return generalPopularity;
  }

  public get admin(): UserRoomEntity {
    return this._users.admin;
  }

  public get isFull(): boolean {
    return this._limit && this._limit <= this.users.length;
  }

  public get waitingUsers(): UserEntity[] {
    return this._users.waitingInvitation.map((user) => user.user);
  }

  public hasUser(user: UserEntity): boolean {
    return this.users.some((userInRoom) => userInRoom.equals(user));
  }

  public addUserInQueue(userEntity): void {
    this._users.waitingInvitation.push(new UserRoomEntity(userEntity));
  }

  public isUserWaitInvitation(user: UserEntity): boolean {
    return this._users.waitingInvitation.some((waitingUser) =>
      waitingUser.equals(user),
    );
  }

  public isAdmin(user: UserEntity): boolean {
    return this.admin.equals(user);
  }

  public hasUserAcces(user: UserEntity) {
    return (
      this.isOpen || this.users.some((participant) => participant.equals(user))
    );
  }

  public addUser(user: UserRoomEntity, isAdmin?: boolean): void {
    if (isAdmin) {
      this._users.admin = user;
    } else {
      this._users.commonUsers.push(user);
    }
  }

  private getMessagePopularity(message: MessageEntity) {
    return 1 / DateUtils.daysBetweenDates(message.date, this._date);
  }
}
