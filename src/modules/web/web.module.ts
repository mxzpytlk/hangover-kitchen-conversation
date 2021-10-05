import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TokenOrmModule } from '../database/token-orm/token-orm.module';
import { AuthModule } from './auth/auth.module';
import { AppGuard } from './guards/app.guard';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, RoomModule, UserModule, TokenOrmModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppGuard,
    },
  ],
})
export class WebModule {}
