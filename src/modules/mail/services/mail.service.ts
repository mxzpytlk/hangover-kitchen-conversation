import { createTransport, SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Exception } from 'src/core/shared/exception';
import { Injectable } from '@nestjs/common';
import { environment } from 'src/core/env';

type MailMessage = {
  recieverEmail: string;
  subject: string;
  text?: string;
  html?: string;
};

@Injectable()
export class MailService {
  private _transporter: Mail<SentMessageInfo>;

  constructor() {
    this._transporter = createTransport({
      host: environment.MAIL_HOST,
      port: +environment.MAIL_PORT,
      secure: true,
      auth: {
        user: environment.MAIL_USER,
        pass: environment.MAIL_PASS,
      },
    });
  }

  public async sendMail(message: MailMessage): Promise<void> {
    try {
      await this._transporter.sendMail({
        from: environment.MAIL_USER,
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
