import { MailService } from './mail.service';
import { v4 } from 'uuid';
import { ApiRoutes } from 'src/core/enums/api-route';
import { INotificationPort } from 'src/domain/notifications/out/notification.port';

export const ActivationMailSymbol = Symbol('ActivationMailService');

export class ActivationMailService
  implements INotificationPort<undefined, string>
{
  constructor(private readonly _mailService: MailService) {}

  public async sendNotification(email: string): Promise<string> {
    const activationLink = v4();
    const link = `${process.env.PORT}${ApiRoutes.ACTIVATE}${activationLink}`;
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
    return activationLink;
  }
}
