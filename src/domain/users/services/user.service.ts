import { UserEntity } from '../entities/user.entity';
import { IUserUseCase } from '../in/user.use-case';
import { PersonalInfo } from '../model/personal-info';
import { IUserStorePort } from '../out/user-store.port';

export class UserService implements IUserUseCase {
  constructor(private readonly _userStorePort: IUserStorePort) {}

  public async updateProfileInfo(
    user: UserEntity,
    newProfile: PersonalInfo,
  ): Promise<void> {
    return this._userStorePort.updateProfile(user, newProfile);
  }
}
