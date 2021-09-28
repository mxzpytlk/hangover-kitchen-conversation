import { UserEntity, UserId } from 'src/domain/auth/entities/user.entity';

export interface IUserStore {
  getUserById(userId: UserId): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity>;
  getByActivationLink(activationLink: string): Promise<UserEntity>;
  saveUser(user: UserEntity): Promise<UserEntity>;
  activateUser(activationLink: string): Promise<void>;
}
