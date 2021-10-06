import { Module } from '@nestjs/common';
import { TokenOrmModule } from './token-orm/token-orm.module';
import { UserRoomOrmModule } from './user-room-orm/user-room-orm.module';
import { NotificationOrmModule } from './notification-orm/notification-orm.module';

@Module({
  imports: [TokenOrmModule, UserRoomOrmModule, NotificationOrmModule],
  exports: [TokenOrmModule, UserRoomOrmModule],
})
export class DatabaseModule {}
