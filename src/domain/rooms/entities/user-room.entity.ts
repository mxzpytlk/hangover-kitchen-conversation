import { UserEntity, UserId } from 'src/domain/users/entities/user.entity';

export class UserRoomEntity {
  constructor(
    private readonly _user: UserEntity,
    private readonly _isNotificationsOn = true,
  ) {}

  public get isNotificationsOn(): boolean {
    return this._isNotificationsOn;
  }

  public get id(): UserId {
    return this._user.id;
  }

  public equals(user: UserEntity | UserRoomEntity) {
    return this._user.id === user.id;
  }
}
