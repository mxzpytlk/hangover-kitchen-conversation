import { IAuthUseCase, SuccessAuth } from './in/auth.use-case';
import { IUserStorePort } from '../users/out/user-store.port';
import { Exception } from '../../core/shared/exception';
import { hash } from 'bcrypt';
import { TokenService } from './token.service';
import { JSONUtils } from 'src/core/utils/json.utils';
import { RegisterResult } from './auth.type';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { compare } from 'bcrypt';
import { INotificationPort } from '../notifications/out/notification.port';

export class AuthService implements IAuthUseCase {
  constructor(
    private readonly _userStore: IUserStorePort,
    private readonly _emailNotificator: INotificationPort<undefined, string>,
    private readonly _tokenService: TokenService,
  ) {}

  public async register(
    email: string,
    password: string,
  ): Promise<RegisterResult> {
    const candidate = await this._userStore.getUserByEmail(email);
    if (candidate) {
      throw Exception.EMAIL_EXISTS;
    }
    const hashPass = await hash(password, 3);
    const activationLink = await this._emailNotificator.sendNotification(email);
    const user = await this._userStore.saveUser(
      UserEntity.createNew(email, hashPass, activationLink),
    );
    const jwt = this._tokenService.generateToken(
      JSONUtils.converToJsonObject(user),
    );
    await this._tokenService.saveToken(user.id, jwt.refreshToken);
    return RegisterResult.SUCCESS;
  }

  public async activate(activationLink: string): Promise<void> {
    const user = await this._userStore.getByActivationLink(activationLink);
    if (!user) {
      throw Exception.ACTIVATION_LINK_INCORRECT;
    }
    if (user.isActivated) {
      throw Exception.ALREDY_ACTIVATED;
    }
    return this._userStore.activateUser(activationLink);
  }

  public async login(email: string, password: string): Promise<SuccessAuth> {
    const user = await this._userStore.getUserByEmail(email);
    if (!user) {
      throw Exception.WRONG_AUTH_DATA;
    }
    const isPathEquals = await compare(password, user.password);
    if (!isPathEquals) {
      throw Exception.WRONG_AUTH_DATA;
    }
    const jwt = this._tokenService.generateToken(
      JSONUtils.converToJsonObject(user),
    );

    await this._tokenService.saveToken(user.id, jwt.refreshToken);
    return { user, jwt };
  }

  public async refresh(refreshToken: string): Promise<SuccessAuth> {
    if (!refreshToken) {
      throw Exception.WRONG_AUTH_DATA;
    }
    const user = await this._tokenService.validateRefreshToken(refreshToken);
    if (!user) {
      throw Exception.WRONG_AUTH_DATA;
    }
    const jwt = this._tokenService.generateToken(
      JSONUtils.converToJsonObject(user),
    );
    await this._tokenService.saveToken(user.id, jwt.refreshToken);
    return {
      user,
      jwt,
    };
  }

  public async logout(refreshToken: string): Promise<void> {
    return this._tokenService.deleteRefreshToken(refreshToken);
  }
}
