import { Module } from '@nestjs/common';
import { UserOrmModule } from './user-orm/user-orm.module';
import { TokenOrmModule } from './token-orm/token-orm.module';

@Module({
  imports: [UserOrmModule, TokenOrmModule],
  exports: [UserOrmModule, TokenOrmModule],
})
export class DatabaseModule {}
