export class Exception extends Error {
  constructor(message?: string) {
    super(message);
  }

  public static get EMAIL_EXISTS(): Exception {
    return new Exception('User with this email already exists');
  }
}
