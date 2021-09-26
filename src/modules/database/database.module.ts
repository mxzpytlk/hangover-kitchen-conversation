import { Global, Module } from '@nestjs/common';
import { UserOrmModule } from './user-orm/user-orm.module';
import { TokenOrmModule } from './token-orm/token-orm.module';
import { AuthUseCaseSymbol } from 'src/domain/auth/in/auth.use-case';
import { UserPersistenceAdapter } from './user-orm/user-persistance.adapter';
import { AuthService } from 'src/domain/auth/auth.service';
import { ActivationMailService } from 'src/application/mail/activation-mail.service';
import { TokenService } from 'src/domain/auth/token/token.service';
import { TokenPersistenceAdapter } from './token-orm/token-persistance.adapter';

@Global()
@Module({
  imports: [UserOrmModule, TokenOrmModule],
  providers: [
    {
      provide: AuthUseCaseSymbol,

      useFactory: (
        userPersistenceAdapter: UserPersistenceAdapter,
        tokenPersistenceAdapter: TokenPersistenceAdapter,
      ) =>
        new AuthService(
          userPersistenceAdapter,
          userPersistenceAdapter,
          new ActivationMailService(),
          new TokenService(
            tokenPersistenceAdapter,
            tokenPersistenceAdapter,
            tokenPersistenceAdapter,
          ),
        ),

      inject: [UserPersistenceAdapter, TokenPersistenceAdapter],
    },
  ],
  exports: [AuthUseCaseSymbol],
})
export class DatabaseModule {}
