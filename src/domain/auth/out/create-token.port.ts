import { UserId } from 'src/domain/entities/user.entity';
import { UserRefreshToken } from 'src/domain/auth/token/token.type';

export interface ISaveTokenPort {
  saveToken(userId: UserId, refreshToken: string): Promise<UserRefreshToken>;
}
