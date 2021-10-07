import { Module } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { NotificationOrmModule } from 'src/modules/database/notification-orm/notification-orm.module';
import { NotificationPersistanceAdapter } from 'src/modules/database/notification-orm/notification-persistance.adapter';
import { MailModule } from 'src/modules/mail/mail.module';
import { MailService } from 'src/modules/mail/services/mail.service';
import { NotificationValueResolver } from './graphql/notification-value.resolver';
import { NotificationResolver } from './graphql/notification.resolver';
import {
  ActivationMailService,
  ActivationMailSymbol,
} from './services/activation-mail.service';
import {
  NotificationService,
  NotificationServiceSymbol,
} from './services/notification.service';

@Module({
  imports: [NotificationOrmModule, MailModule],
  providers: [
    NotificationResolver,
    NotificationValueResolver,
    {
      provide: NotificationServiceSymbol,
      useFactory: (
        pubSub: PubSub,
        notificationPersistanceAdapter: NotificationPersistanceAdapter,
      ) => new NotificationService(pubSub, notificationPersistanceAdapter),
      inject: [PubSub, NotificationPersistanceAdapter],
    },
    {
      provide: ActivationMailSymbol,
      useFactory: (mailService: MailService) =>
        new ActivationMailService(mailService),
      inject: [MailService],
    },
  ],
  exports: [NotificationServiceSymbol, ActivationMailSymbol],
})
export class NotificationModule {}
