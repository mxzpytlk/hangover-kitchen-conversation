import { UserRefreshToken } from 'src/domain/auth/auth.type';
import { TokenOrmEntity } from './token.orm-entity';

export class TokenMapper {
  public static toDomain(tokenOrmEntity: TokenOrmEntity): UserRefreshToken {
    if (!tokenOrmEntity) {
      return null;
    }
    return {
      refreshToken: tokenOrmEntity.refresh_token,
      userId: tokenOrmEntity.user_id,
      id: tokenOrmEntity.id,
    };
  }

  public static toOrmEntity(tokenEntity: UserRefreshToken): TokenOrmEntity {
    const tokenOrmEntity = new TokenOrmEntity();
    tokenOrmEntity.userId = tokenEntity.userId;
    tokenOrmEntity.refresh_token = tokenEntity.refreshToken;
    tokenOrmEntity.id = tokenEntity.id;
    return tokenOrmEntity;
  }
}
