import { Module } from '@nestjs/common';
import { AuthService } from 'src/domain/auth/auth.service';
import { AuthUseCaseSymbol } from 'src/domain/auth/in/auth.use-case';
import {
  TokenService,
  TokenServiceSymbol,
} from 'src/domain/auth/token.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { UserPersistenceAdapter } from 'src/modules/database/user-orm/user-persistance.adapter';
import { ActivationMailSymbol } from 'src/modules/mail/services/activation-mail.service';
import { MailModule } from 'src/modules/mail/mail.module';
import { AuthController } from './api/auth.controller';
import { AuthResolver } from './graphql/auth.resolver';
import { INotificationPort } from 'src/domain/notifications/out/notification.port';

@Module({
  imports: [MailModule, DatabaseModule],
  providers: [
    {
      provide: AuthUseCaseSymbol,
      useFactory: (
        userPersistenceAdapter: UserPersistenceAdapter,
        activationMailService: INotificationPort<undefined, string>,
        tokenService: TokenService,
      ) =>
        new AuthService(
          userPersistenceAdapter,
          activationMailService,
          tokenService,
        ),

      inject: [
        UserPersistenceAdapter,
        ActivationMailSymbol,
        TokenServiceSymbol,
      ],
    },
    AuthResolver,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
