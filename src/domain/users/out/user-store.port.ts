import { UserEntity } from '../entities/user.entity';
import { PersonalInfo } from '../model/personal-info';

export interface IUserStorePort {
  updateProfile(user: UserEntity, profile: PersonalInfo): Promise<void>;
}
