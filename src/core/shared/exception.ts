export enum ExceptionTypes {
  USER_INPUT,
  PERMISSION_DENIED,
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

  public static get ACTIVATION_LINK_INCORRECT(): Exception {
    return new Exception(
      'Incorrect activation link',
      ExceptionTypes.USER_INPUT,
    );
  }

  public static get ALREDY_ACTIVATED(): Exception {
    return new Exception(
      'Acount already activated',
      ExceptionTypes.PERMISSION_DENIED,
    );
  }
}
