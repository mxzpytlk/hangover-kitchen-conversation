import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RandomUtils } from 'src/core/utils/random.utils';
import { UserRefreshToken } from 'src/domain/auth/auth.type';
import { ITokenStorePort } from 'src/domain/auth/out/token-store.port';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../user-orm/user.orm-entity';
import { TokenMapper } from './token.mapper';
import { TokenOrmEntity } from './token.orm-entity';

@Injectable()
export class TokenPersistenceAdapter implements ITokenStorePort {
  constructor(
    @InjectRepository(TokenOrmEntity)
    private readonly _tokenRepository: Repository<TokenOrmEntity>,
  ) {}

  public async saveToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserRefreshToken> {
    const id = RandomUtils.randomString(16);
    const tokenOrmEntity = TokenMapper.toOrmEntity({
      id,
      userId,
      refreshToken,
    });
    const {
      generatedMaps: [result],
    } = await this._tokenRepository.insert(tokenOrmEntity);
    return TokenMapper.toDomain(result as TokenOrmEntity);
  }

  public async getToken(user_id: string): Promise<UserRefreshToken> {
    const tokenOrmEntity = await this._tokenRepository.findOne({
      where: {
        user_id,
      },
    });

    return TokenMapper.toDomain(tokenOrmEntity);
  }

  public async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserRefreshToken> {
    const user = new UserOrmEntity();
    user.id = userId;
    const {
      generatedMaps: [result],
    } = await this._tokenRepository.update(
      {
        user,
      },
      {
        refresh_token: refreshToken,
      },
    );
    return TokenMapper.toDomain(result as TokenOrmEntity);
  }

  public async deleteRefreshToken(refreshToken: string): Promise<void> {
    const token = new TokenOrmEntity();
    token.refresh_token = refreshToken;
    await this._tokenRepository.delete(token);
  }
}
