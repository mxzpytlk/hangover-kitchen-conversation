import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagePersistanceAdapter } from './message-persistance.adapter';
import { MessageOrmEntity } from './message.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageOrmEntity])],
  providers: [MessagePersistanceAdapter],
  exports: [MessagePersistanceAdapter],
})
export class MessageOrmModule {}
