export enum ExceptionTypes {
  USER_INPUT,
}

export class Exception extends Error {
  constructor(message?: string, public readonly type?: ExceptionTypes) {
    super(message);
  }

  public static get EMAIL_EXISTS(): Exception {
    return new Exception(
      'User with this email already exists',
      ExceptionTypes.USER_INPUT,
    );
  }
}
