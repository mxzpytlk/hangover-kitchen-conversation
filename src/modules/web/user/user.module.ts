import { Module } from '@nestjs/common';
import { UserUseCaseSymbol } from 'src/domain/users/in/user.use-case';
import { UserService } from 'src/domain/users/services/user.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { UserPersistenceAdapter } from 'src/modules/database/user-orm/user-persistance.adapter';
import { UserResolver } from './graphql/user.resolver';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: UserUseCaseSymbol,
      useFactory: (userPersistenceAdapter: UserPersistenceAdapter) =>
        new UserService(userPersistenceAdapter),
      inject: [UserPersistenceAdapter],
    },
    UserResolver,
  ],
})
export class UserModule {}
