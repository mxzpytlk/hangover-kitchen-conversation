import { UserEntity } from '../entities/user.entity';
import { PersonalInfo } from '../model/personal-info';

export interface IUserUseCase {
  updateProfileInfo(user: UserEntity, newProfile: PersonalInfo): Promise<void>;
}
