import { Module } from '@nestjs/common';
import { TokenOrmModule } from './token-orm/token-orm.module';
import { UserRoomOrmModule } from './user-room-orm/user-room-orm.module';
import { NotificationOrmModule } from './notification-orm/notification-orm.module';
import { MessageOrmModule } from './message-orm/message-orm.module';
import { FileOrmModule } from './file-orm/file-orm.module';

@Module({
  imports: [
    TokenOrmModule,
    UserRoomOrmModule,
    NotificationOrmModule,
    MessageOrmModule,
    FileOrmModule,
  ],
  exports: [TokenOrmModule, UserRoomOrmModule, MessageOrmModule],
})
export class DatabaseModule {}
