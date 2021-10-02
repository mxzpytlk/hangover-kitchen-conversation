import { Exception } from 'src/core/shared/exception';
import { UserEntity } from '../entities/user.entity';
import { IUserUseCase } from '../in/user.use-case';
import { PersonalInfo, PersonalInfoChanges } from '../model/personal-info';
import { IUserStorePort } from '../out/user-store.port';

export class UserService implements IUserUseCase {
  constructor(private readonly _userStorePort: IUserStorePort) {}

  public async updateProfileInfo(
    user: UserEntity,
    newProfile: PersonalInfoChanges,
  ): Promise<PersonalInfo> {
    if (newProfile.name === '') {
      throw Exception.EMPTY_NAME;
    }
    const changes: PersonalInfoChanges = {};
    if (newProfile.name) {
      changes.name = newProfile.name;
    }
    if (
      newProfile.description !== undefined &&
      newProfile.description !== null
    ) {
      changes.description = newProfile.description;
    }

    return this._userStorePort.updateProfile(user, changes);
  }
}
