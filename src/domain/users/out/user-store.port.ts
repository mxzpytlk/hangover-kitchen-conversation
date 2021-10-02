import { UserEntity, UserId } from 'src/domain/users/entities/user.entity';
import {
  PersonalInfo,
  PersonalInfoChanges,
} from 'src/domain/users/model/personal-info';

export interface IUserStorePort {
  getUserById(userId: UserId): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity>;
  getByActivationLink(activationLink: string): Promise<UserEntity>;
  saveUser(user: UserEntity): Promise<UserEntity>;
  activateUser(activationLink: string): Promise<void>;
  updateProfile(
    user: UserEntity,
    changes: PersonalInfoChanges,
  ): Promise<PersonalInfo>;
}
