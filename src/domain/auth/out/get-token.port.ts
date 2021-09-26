import { UserId } from 'src/domain/entities/user.entity';
import { UserRefreshToken } from 'src/domain/auth/token/token.type';

export interface IGetTokenPort {
  getToken(userId: UserId): Promise<UserRefreshToken>;
}
