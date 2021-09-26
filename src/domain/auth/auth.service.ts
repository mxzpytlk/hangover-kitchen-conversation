import { IAuthUseCase } from './in/auth.use-case';
import { IGetUserPort } from './out/get-user.port';
import { Exception } from '../../core/shared/exception';
import { hash } from 'bcrypt';
import { ISaveUserPort } from './out/save-user.ports';
import { TokenService } from './token/token.service';
import { JSONUtils } from 'src/core/utils/json.utils';
import { RegisterResult } from './auth.type';
import { IActivationInformPort } from 'src/domain/auth/out/activation-inform.port';
import { UserEntity } from 'src/domain/entities/user.entity';

export class AuthService implements IAuthUseCase {
  constructor(
    private readonly _getUserPort: IGetUserPort,
    private readonly _saveUserPort: ISaveUserPort,
    private readonly _activationInformPort: IActivationInformPort,
    private readonly _tokenService: TokenService,
  ) {}

  public async register(
    email: string,
    password: string,
  ): Promise<RegisterResult> {
    const candidate = await this._getUserPort.getUserByEmail(email);
    if (candidate) {
      throw Exception.EMAIL_EXISTS;
    }
    const hashPass = await hash(password, 3);
    const activationLink = await this._activationInformPort.inform(email);
    const user = await this._saveUserPort.saveUser(
      UserEntity.createNew(email, hashPass, activationLink),
    );
    const jwt = this._tokenService.generateToken(
      JSONUtils.converToJsonObject(user),
    );
    await this._tokenService.saveToken(user.id, jwt.refreshToken);
    return RegisterResult.SUCCESS;
  }
}
