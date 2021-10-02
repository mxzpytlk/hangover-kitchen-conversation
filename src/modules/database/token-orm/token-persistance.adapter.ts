import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RandomUtils } from 'src/core/utils/random.utils';
import { UserRefreshToken } from 'src/domain/auth/auth.type';
import { ITokenStorePort } from 'src/domain/auth/out/token-store.port';
import { Repository } from 'typeorm';
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

  public async getToken(userId: string): Promise<UserRefreshToken> {
    const tokenOrmEntity = await this._tokenRepository.findOne({
      where: {
        userId,
      },
    });

    return TokenMapper.toDomain(tokenOrmEntity);
  }

  public async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserRefreshToken> {
    const {
      generatedMaps: [result],
    } = await this._tokenRepository.update(
      {
        userId,
      },
      {
        refreshToken,
      },
    );
    return TokenMapper.toDomain(result as TokenOrmEntity);
  }

  public async deleteRefreshToken(refreshToken: string): Promise<void> {
    const token = new TokenOrmEntity();
    token.refreshToken = refreshToken;
    await this._tokenRepository.delete(token);
  }
}
