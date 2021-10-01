import { Global, Module } from '@nestjs/common';
import { UserOrmModule } from './user-orm/user-orm.module';
import { TokenOrmModule } from './token-orm/token-orm.module';
import { AuthUseCaseSymbol } from 'src/domain/auth/in/auth.use-case';
import { UserPersistenceAdapter } from './user-orm/user-persistance.adapter';
import { AuthService } from 'src/domain/auth/auth.service';
import {
  ActivationMailService,
  ActivationMailSymbol,
} from 'src/modules/mail/activation-mail.service';
import {
  TokenService,
  TokenServiceSymbol,
} from 'src/domain/auth/token.service';
import { TokenPersistenceAdapter } from './token-orm/token-persistance.adapter';
import { MailService } from 'src/modules/mail/services/mail.service';
import { MailModule } from '../mail/mail.module';

@Global()
@Module({
  imports: [UserOrmModule, TokenOrmModule, MailModule],
  providers: [
    {
      provide: TokenServiceSymbol,
      useFactory: (tokenPersistenceAdapter: TokenPersistenceAdapter) =>
        new TokenService(tokenPersistenceAdapter),
      inject: [TokenPersistenceAdapter],
    },
    {
      provide: AuthUseCaseSymbol,

      useFactory: (
        userPersistenceAdapter: UserPersistenceAdapter,
        activationMailService: ActivationMailService,
        tokenService: TokenService,
      ) => {
        // console.log((activationMailService as any)());

        return new AuthService(
          userPersistenceAdapter,
          activationMailService,
          tokenService,
        );
      },

      inject: [
        UserPersistenceAdapter,
        ActivationMailSymbol,
        TokenServiceSymbol,
      ],
    },
  ],
  exports: [AuthUseCaseSymbol],
})
export class DatabaseModule {}
