export enum ExceptionTypes {
  USER_INPUT,
  PERMISSION_DENIED,
  UNAUTHORISED,
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

  public static get WRONG_AUTH_DATA(): Exception {
    return new Exception('Incorrect auth data', ExceptionTypes.UNAUTHORISED);
  }

  public static get PERMISSION_DENIED(): Exception {
    return new Exception('Permission denied', ExceptionTypes.PERMISSION_DENIED);
  }

  public static get ROOM_IS_FULL(): Exception {
    return new Exception('Room is full', ExceptionTypes.PERMISSION_DENIED);
  }

  public static get KICK_ADMIN(): Exception {
    return new Exception(
      'Kicking admin is not allowed',
      ExceptionTypes.PERMISSION_DENIED,
    );
  }

  public static get ONLY_FOR_AUTHORISED(): Exception {
    return new Exception(
      'Operation available only for authorised users',
      ExceptionTypes.PERMISSION_DENIED,
    );
  }

  public static get EMPTY_NAME(): Exception {
    return new Exception(
      'User must not have empty name',
      ExceptionTypes.USER_INPUT,
    );
  }

  public static get ALREADY_TRY_JOIN(): Exception {
    return new Exception(
      'User has already tried to join room',
      ExceptionTypes.PERMISSION_DENIED,
    );
  }

  public static get USER_NOT_JOIN_ROOM(): Exception {
    return new Exception(
      'User has not sent request to join this room',
      ExceptionTypes.PERMISSION_DENIED,
    );
  }

  public static get NOT_ADMIN(): Exception {
    return new Exception(
      'User is not admin of room',
      ExceptionTypes.PERMISSION_DENIED,
    );
  }

  public static get NOT_ANONIMUS_MESSAGE(): Exception {
    return new Exception(
      'Room does not support anonimus message',
      ExceptionTypes.USER_INPUT,
    );
  }

  public static get NO_MESSAGE_IN_ROOM(): Exception {
    return new Exception(
      'This message does not exist in room',
      ExceptionTypes.USER_INPUT,
    );
  }
}
