import { UserEntity } from 'src/domain/users/entities/user.entity';
import { PersonalInfo } from 'src/domain/users/model/personal-info';
import { UserOrmEntity } from './user.orm-entity';

export class UserMapper {
  public static mapToDomain(user: UserOrmEntity): UserEntity {
    if (!user) {
      return null;
    }
    const { id, email, password, activationLink, isActivated } = user;
    const profile: PersonalInfo = {
      name: user.name,
      description: user.description,
    };
    return new UserEntity(
      id,
      email,
      isActivated,
      password,
      activationLink,
      profile,
    );
  }

  public static mapToOrmEntity(userEntity: UserEntity): UserOrmEntity {
    const userOrmEntity = new UserOrmEntity();
    userOrmEntity.id = userEntity.id;
    userOrmEntity.email = userEntity.email;
    userOrmEntity.password = userEntity.password;
    userOrmEntity.activationLink = userEntity.activationLink;
    userOrmEntity.isActivated = userEntity.isActivated;
    userOrmEntity.name = userEntity.name;
    userOrmEntity.description = userEntity.description;
    return userOrmEntity;
  }
}
