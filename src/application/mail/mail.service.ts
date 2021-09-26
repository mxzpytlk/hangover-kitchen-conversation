import * as config from 'src/assets/config.json';
import { createTransport, SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Exception } from 'src/core/shared/exception';

type MailMessage = {
  recieverEmail: string;
  subject: string;
  text?: string;
  html?: string;
};

export class MailService {
  private _transporter: Mail<SentMessageInfo>;

  constructor() {
    this._transporter = createTransport({
      host: config.mailHost,
      port: config.mailPort,
      secure: true,
      auth: {
        user: config.mailUser,
        pass: config.mailPass,
      },
    });
  }

  protected async sendMail(message: MailMessage): Promise<void> {
    try {
      await this._transporter.sendMail({
        from: config.mailUser,
        to: message.recieverEmail,
        subject: message.subject,
        text: message.text ?? '',
        html: message.html ?? '',
      });
    } catch (e) {
      throw new Exception(e.message);
    }
  }
}
