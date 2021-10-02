import { UserEntity } from '../entities/user.entity';
import { PersonalInfo, PersonalInfoChanges } from '../model/personal-info';

export const UserUseCaseSymbol = Symbol('UserService');

export interface IUserUseCase {
  updateProfileInfo(
    user: UserEntity,
    newProfile: PersonalInfoChanges,
  ): Promise<PersonalInfo>;
}
