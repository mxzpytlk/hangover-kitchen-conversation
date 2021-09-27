import { Module } from '@nestjs/common';
import { AuthController } from './api/auth.controller';
import { AuthResolver } from './graphql/auth.resolver';

@Module({
  providers: [AuthResolver],
  controllers: [AuthController],
})
export class AuthModule {}
