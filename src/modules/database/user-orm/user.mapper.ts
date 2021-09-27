import { UserEntity } from 'src/domain/entities/user.entity';
import { UserOrmEntity } from './user.orm-entity';

export class UserMapper {
  public static mapToDomain(user: UserOrmEntity): UserEntity {
    if (!user) {
      return null;
    }
    const { id, email, password, activationLink, isActivated } = user;
    return new UserEntity(id, email, password, activationLink, isActivated);
  }

  public static mapToOrmEntity(userEntity: UserEntity): UserOrmEntity {
    const userOrmEntity = new UserOrmEntity();
    userOrmEntity.email = userEntity.email;
    userOrmEntity.password = userEntity.password;
    userOrmEntity.activation_link = userEntity.activationLink;
    userOrmEntity.is_activated = userEntity.isActivated;
    return userOrmEntity;
  }
}
