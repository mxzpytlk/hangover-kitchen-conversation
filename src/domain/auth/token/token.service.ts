import { JwtPayload, sign, verify } from 'jsonwebtoken';
import * as config from 'src/assets/config.json';
import { JSObject } from 'src/core/types';
import { UserEntity, UserId } from 'src/domain/entities/user.entity';
import { ISaveTokenPort } from 'src/domain/auth/out/create-token.port';
import { IGetTokenPort } from 'src/domain/auth/out/get-token.port';
import { IUpdateTokenPort } from 'src/domain/auth/out/update-token.port';
import { Jwt, UserRefreshToken } from './token.type';
import { IDeleteTokenPort } from '../out/delete-token.port';

export const TokenServiceSymbol = Symbol('TokenService');

export class TokenService {
  constructor(
    private readonly _saveTokenPort: ISaveTokenPort,
    private readonly _getTokenPort: IGetTokenPort,
    private readonly _updateTokenPort: IUpdateTokenPort,
    private readonly _deleteTokenPort: IDeleteTokenPort,
  ) {}

  public generateToken(payload: string | JSObject | Buffer): Jwt {
    const accessToken = sign(payload, config.jwtSecretAcces, {
      expiresIn: '30m',
    });
    const refreshToken = sign(payload, config.jwtSecretRefresh, {
      expiresIn: '30d',
    });

    return { accessToken, refreshToken };
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

  public async validateRefreshToken(token: string): Promise<UserEntity> {
    try {
      const userData = verify(token, config.jwtSecretRefresh) as JwtPayload;
      return new UserEntity(
        userData._id,
        userData._email,
        userData._password,
        userData._activationLink,
        userData._isActivated,
      );
    } catch (_) {
      return null;
    }
  }

  public async deleteRefreshToken(refreshToken: string): Promise<void> {
    return this._deleteTokenPort.deleteRefreshToken(refreshToken);
  }
}
