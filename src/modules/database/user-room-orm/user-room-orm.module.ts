import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmModule } from '../user-orm/user-orm.module';
import { RoomPersistanceAdapter } from './adapters/room-persistance.adapter';
import { UserRoomPersistanceAdapter } from './adapters/user-room-persistance.adapter';
import { RoomOrmEntity } from './orm-entities/room.orm-entity';
import { UserRoomOrmEntity } from './orm-entities/user-room.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomOrmEntity, UserRoomOrmEntity]),
    UserOrmModule,
  ],
  providers: [UserRoomPersistanceAdapter, RoomPersistanceAdapter],
  exports: [UserOrmModule, UserRoomPersistanceAdapter, RoomPersistanceAdapter],
})
export class UserRoomOrmModule {}
