import { UserEntity } from 'src/domain/entities/user.entity';

export interface ISaveUserPort {
  saveUser(user: UserEntity): Promise<UserEntity>;
}
