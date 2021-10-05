import { Module } from '@nestjs/common';
import { TokenOrmModule } from './token-orm/token-orm.module';
import { UserRoomOrmModule } from './user-room-orm/user-room-orm.module';

@Module({
  imports: [TokenOrmModule, UserRoomOrmModule],
  exports: [TokenOrmModule, UserRoomOrmModule],
})
export class DatabaseModule {}
