import { Module } from '@nestjs/common';
import { AuthService } from 'src/domain/auth/auth.service';
import { AuthUseCaseSymbol } from 'src/domain/auth/in/auth.use-case';
import {
  TokenService,
  TokenServiceSymbol,
} from 'src/domain/auth/token.service';
import { DatabaseModule } from 'src/modules/database/database.module';
import { UserPersistenceAdapter } from 'src/modules/database/user-orm/user-persistance.adapter';
import { ActivationMailSymbol } from 'src/modules/web/notification/services/activation-mail.service';
import { AuthController } from './api/auth.controller';
import { AuthResolver } from './graphql/auth.resolver';
import { INotificationPort } from 'src/domain/notifications/out/notification.port';
import { ProfileFullfiledGuard } from './guards/profile-fullfiled.guard';
import { AuthGuard } from './guards/auth.guard';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [DatabaseModule, NotificationModule],
  providers: [
    {
      provide: AuthUseCaseSymbol,
      useFactory: (
        userPersistenceAdapter: UserPersistenceAdapter,
        activationMailService: INotificationPort<string>,
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
    ProfileFullfiledGuard,
    AuthGuard,
  ],
  controllers: [AuthController],
  exports: [ProfileFullfiledGuard, AuthGuard],
})
export class AuthModule {}
