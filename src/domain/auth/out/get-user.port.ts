import { UserEntity, UserId } from 'src/domain/entities/user.entity';

export interface IGetUserPort {
  getUserById(userId: UserId): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity>;
}
