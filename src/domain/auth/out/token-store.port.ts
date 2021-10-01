import { UserId } from 'src/domain/users/entities/user.entity';
import { UserRefreshToken } from '../auth.type';

export interface ITokenStorePort {
  saveToken(userId: UserId, refreshToken: string): Promise<UserRefreshToken>;
  deleteRefreshToken(refreshToken: string): Promise<void>;
  getToken(userId: UserId): Promise<UserRefreshToken>;
  updateRefreshToken(
    userId: UserId,
    refreshToken: string,
  ): Promise<UserRefreshToken>;
}
