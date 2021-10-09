import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TokenOrmModule } from '../database/token-orm/token-orm.module';
import { AuthModule } from './auth/auth.module';
import { AppGuard } from './guards/app.guard';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    AuthModule,
    RoomModule,
    UserModule,
    TokenOrmModule,
    NotificationModule,
    SubscriptionModule,
    MessageModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppGuard,
    },
  ],
})
export class WebModule {}
