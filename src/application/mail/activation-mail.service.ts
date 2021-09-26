import { IActivationInformPort } from 'src/domain/auth/out/activation-inform.port';
import { MailService } from './mail.service';
import { v4 } from 'uuid';
import * as config from 'src/assets/config.json';
import { ApiRoutes } from 'src/core/enums/api-route';

export class ActivationMailService
  extends MailService
  implements IActivationInformPort
{
  public async inform(email: string): Promise<string> {
    const activationLink = v4();
    const link = `${config.appUrl}/${ApiRoutes.ACTIVATE}${activationLink}`;
    await this.sendMail({
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
