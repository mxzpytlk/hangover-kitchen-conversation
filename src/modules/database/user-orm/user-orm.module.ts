import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPersistenceAdapter } from './user-persistance.adapter';
import { UserOrmEntity } from './user.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [UserPersistenceAdapter],
  exports: [UserPersistenceAdapter],
})
export class UserOrmModule {}
