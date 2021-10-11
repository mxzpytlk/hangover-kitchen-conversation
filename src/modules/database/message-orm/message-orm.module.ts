import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmModule } from '../user-orm/user-orm.module';
import { MessagePersistanceAdapter } from './message-persistance.adapter';
import { MessageOrmEntity } from './message.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageOrmEntity]), UserOrmModule],
  providers: [MessagePersistanceAdapter],
  exports: [MessagePersistanceAdapter],
})
export class MessageOrmModule {}
