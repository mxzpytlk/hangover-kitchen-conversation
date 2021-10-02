import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/users/entities/user.entity';
import { IUserStorePort } from 'src/domain/users/out/user-store.port';
import { Repository } from 'typeorm';
import { UserMapper } from './user.mapper';
import { UserOrmEntity } from './user.orm-entity';
import { v4 } from 'uuid';
import {
  PersonalInfo,
  PersonalInfoChanges,
} from 'src/domain/users/model/personal-info';

@Injectable()
export class UserPersistenceAdapter implements IUserStorePort {
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

  public async getByActivationLink(
    activation_link: string,
  ): Promise<UserEntity> {
    const user = await this._userRepository.findOne({
      where: { activation_link },
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

    return new UserEntity(userId.id, email, false, password, activationLink);
  }

  public async activateUser(activationLink: string): Promise<void> {
    this._userRepository.update(
      { activationLink },
      {
        isActivated: true,
      },
    );
  }

  public async updateProfile(
    user: UserEntity,
    changes: PersonalInfoChanges,
  ): Promise<PersonalInfo> {
    if (Object.keys(changes).length > 0) {
      await this._userRepository.update(user.id, changes);
      return {
        name: changes.name ?? user.name,
        description: changes.description ?? user.description,
      };
    }
    return user.personalInfo;
  }
}
