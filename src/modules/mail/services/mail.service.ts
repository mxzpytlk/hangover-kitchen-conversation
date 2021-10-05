import { createTransport, SentMessageInfo } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Exception } from 'src/core/shared/exception';
import { Injectable } from '@nestjs/common';

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
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  public async sendMail(message: MailMessage): Promise<void> {
    try {
      await this._transporter.sendMail({
        from: process.env.MAIL_USER,
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
