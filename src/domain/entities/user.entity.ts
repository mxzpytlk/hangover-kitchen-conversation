export type UserId = string;

type UserObject = {
  id: UserId;
  email: string;
  password: string;
  activationLink: string;
  isActivated: boolean;
};

export class UserEntity {
  constructor(
    private readonly _id: UserId,
    private readonly _email: string,
    private readonly _password?: string,
    private readonly _activationLink?: string,
    private readonly _isActivated = true,
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

  public static createNew(
    email: string,
    password: string,
    activationLink: string,
  ): UserEntity {
    return new UserEntity(null, email, password, activationLink);
  }
}
