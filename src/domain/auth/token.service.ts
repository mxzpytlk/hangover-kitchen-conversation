import { JwtPayload, sign, verify } from 'jsonwebtoken';
import * as config from 'src/assets/config.json';
import { JSObject } from 'src/core/types';
import { UserEntity, UserId } from 'src/domain/users/entities/user.entity';
import { ITokenStorePort } from 'src/domain/auth/out/token-store.port';
import { UserRefreshToken, Jwt } from './auth.type';

export const TokenServiceSymbol = Symbol('TokenService');

export class TokenService {
  constructor(private readonly _tokenStore: ITokenStorePort) {}

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
    const token = await this._tokenStore.getToken(userId);
    return token
      ? this._tokenStore.updateRefreshToken(userId, refreshToken)
      : this._tokenStore.saveToken(userId, refreshToken);
  }

  public async validateRefreshToken(token: string): Promise<UserEntity> {
    try {
      const userData = verify(token, config.jwtSecretRefresh) as JwtPayload;
      return new UserEntity(
        userData._id,
        userData._email,
        userData._isActivated,
        userData._password,
        userData._activationLink,
      );
    } catch (_) {
      return null;
    }
  }

  public async deleteRefreshToken(refreshToken: string): Promise<void> {
    return this._tokenStore.deleteRefreshToken(refreshToken);
  }
}
