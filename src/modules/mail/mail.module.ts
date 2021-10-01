import { Module } from '@nestjs/common';
import {
  ActivationMailService,
  ActivationMailSymbol,
} from './activation-mail.service';
import { MailService } from './services/mail.service';

@Module({
  providers: [
    MailService,
    {
      provide: ActivationMailSymbol,
      useFactory: (mailService: MailService) =>
        new ActivationMailService(mailService),
      inject: [MailService],
    },
  ],
  exports: [MailService, ActivationMailSymbol],
})
export class MailModule {}
