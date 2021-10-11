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
  NotificationWebService,
  NotificationServiceSymbol,
} from './services/notification.service';
import {
  NotificationSubscriptionSymbol,
  SubscriptionNotificationService,
} from './services/subscription-notification.service';

@Module({
  imports: [NotificationOrmModule, MailModule],
  providers: [
    NotificationValueResolver,
    NotificationResolver,
    {
      provide: NotificationSubscriptionSymbol,
      useFactory: (pubSub: PubSub) =>
        new SubscriptionNotificationService(pubSub),
      inject: [PubSub],
    },
    {
      provide: NotificationServiceSymbol,
      useFactory: (
        notificationPersistanceAdapter: NotificationPersistanceAdapter,
        subscriptionNotificationService: SubscriptionNotificationService,
      ) =>
        new NotificationWebService(
          notificationPersistanceAdapter,
          subscriptionNotificationService,
        ),
      inject: [NotificationPersistanceAdapter, NotificationSubscriptionSymbol],
    },
    {
      provide: ActivationMailSymbol,
      useFactory: (mailService: MailService) =>
        new ActivationMailService(mailService),
      inject: [MailService],
    },
  ],
  exports: [
    NotificationServiceSymbol,
    ActivationMailSymbol,
    NotificationSubscriptionSymbol,
  ],
})
export class NotificationModule {}
