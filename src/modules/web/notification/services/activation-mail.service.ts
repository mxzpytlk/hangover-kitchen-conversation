import { MailService } from '../../../mail/services/mail.service';
import { ApiRoutes } from 'src/core/enums/api-route';
import { INotificationPort } from 'src/domain/notifications/out/notification.port';
import { environment } from 'src/core/env';
import { Notification } from 'src/domain/notifications/notification.type';

export const ActivationMailSymbol = Symbol('ActivationMailService');

export class ActivationMailService implements INotificationPort<string> {
  constructor(private readonly _mailService: MailService) {}

  public async sendNotification(
    email: string,
    activationLink: Notification<string>,
  ): Promise<void> {
    const link = `${environment.PORT}${ApiRoutes.ACTIVATE}${activationLink.value}`;
    await this._mailService.sendMail({
      recieverEmail: email,
      subject: 'Acount activation',
      html: `
        <div>
          <h1>Use this <a href="${link}">link</a> for your acount activation</h1>
          <h2>${link}</h2>
        </div>
      `,
    });
  }
}
