import { UserEntity } from 'src/domain/entities/user.entity';
import { UserOrmEntity } from './user.orm-entity';

export class UserMapper {
  public static mapToDomain(user: UserOrmEntity): UserEntity {
    if (!user) {
      return null;
    }
    const { id, email, password } = user;
    return new UserEntity(id, email, password);
  }

  public static mapToOrmEntity(userEntity: UserEntity): UserOrmEntity {
    const userOrmEntity = new UserOrmEntity();
    userOrmEntity.email = userEntity.email;
    userOrmEntity.password = userEntity.password;
    userOrmEntity.activationLink = userEntity.activationLink;
    return userOrmEntity;
  }
}
