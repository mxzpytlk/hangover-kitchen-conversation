import { sign } from 'jsonwebtoken';
import * as config from 'src/assets/config.json';
import { JSObject } from 'src/core/types';
import { UserId } from 'src/domain/entities/user.entity';
import { ISaveTokenPort } from 'src/domain/auth/out/create-token.port';
import { IGetTokenPort } from 'src/domain/auth/out/get-token.port';
import { IUpdateTokenPort } from 'src/domain/auth/out/update-token.port';
import { Jwt, UserRefreshToken } from './token.type';

export class TokenService {
  constructor(
    private readonly _saveTokenPort: ISaveTokenPort,
    private readonly _getTokenPort: IGetTokenPort,
    private readonly _updateTokenPort: IUpdateTokenPort,
  ) {}

  public generateToken(payload: string | JSObject | Buffer): Jwt {
    const accesToken = sign(payload, config.jwtSecretAcces, {
      expiresIn: '30m',
    });
    const refreshToken = sign(payload, config.jwtSecretRefresh, {
      expiresIn: '30d',
    });
    return { accesToken, refreshToken };
  }

  public async saveToken(
    userId: UserId,
    refreshToken: string,
  ): Promise<UserRefreshToken> {
    const token = await this._getTokenPort.getToken(userId);
    return token
      ? this._updateTokenPort.updateRefreshToken(userId, refreshToken)
      : this._saveTokenPort.saveToken(userId, refreshToken);
  }
}
