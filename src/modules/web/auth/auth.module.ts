import { Module } from '@nestjs/common';
import { AuthResolver } from './graphql/auth.resolver';

@Module({
  providers: [AuthResolver],
})
export class AuthModule {}
