import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/entities/user.entity';
import { IGetUserPort } from 'src/domain/auth/out/get-user.port';
import { ISaveUserPort } from 'src/domain/auth/out/save-user.ports';
import { Repository } from 'typeorm';
import { UserMapper } from './user.mapper';
import { UserOrmEntity } from './user.orm-entity';
import { v4 } from 'uuid';

@Injectable()
export class UserPersistenceAdapter implements ISaveUserPort, IGetUserPort {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly _userRepository: Repository<UserOrmEntity>,
  ) {}

  public async getUserById(userId: string): Promise<UserEntity> {
    const user = await this._userRepository.findOne(userId);
    return UserMapper.mapToDomain(user);
  }

  public async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this._userRepository.findOne(undefined, {
      where: { email },
    });
    return UserMapper.mapToDomain(user);
  }

  public async saveUser(userEntity: UserEntity): Promise<UserEntity> {
    const userOrmEntity = UserMapper.mapToOrmEntity(userEntity);
    const id = v4();

    userOrmEntity.id = id.slice(0, 16);
    const {
      identifiers: [userId],
    } = await this._userRepository.insert(userOrmEntity);

    const { email, password, activationLink } = userEntity;

    return new UserEntity(userId.id, email, password, activationLink);
  }
}
