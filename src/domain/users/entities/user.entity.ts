export type UserId = string;

export class UserEntity {
  constructor(
    private readonly _id: UserId,
    private readonly _email: string,
    private readonly _isActivated: boolean,
    private readonly _password?: string,
    private readonly _activationLink?: string,
  ) {}

  public get id(): UserId {
    return this._id;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  public get activationLink(): string {
    return this._activationLink;
  }

  public get isActivated(): boolean {
    return this._isActivated;
  }

  public equals(user: UserEntity): boolean {
    return user?.id === this._id;
  }

  public static createNew(
    email: string,
    password: string,
    activationLink: string,
    isActivated = false,
  ): UserEntity {
    return new UserEntity(null, email, isActivated, password, activationLink);
  }
}
