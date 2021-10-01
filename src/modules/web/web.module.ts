import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, RoomModule, UserModule],
})
export class WebModule {}
