import { UserEntity } from '../entities/user.entity';
import { PersonalInfoChanges } from '../model/personal-info';

export interface IUserStorePort {
  updateProfile(user: UserEntity, changes: PersonalInfoChanges): Promise<void>;
}
