import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;
  private readonly logger = new Logger(EmailService.name);
  private enabled: boolean;

  constructor(private configService: ConfigService) {
    const user = this.configService.get('SMTP_USER');
    const pass = this.configService.get('SMTP_PASS');
    
    if (user && pass) {
      this.enabled = true;
      this.transporter = nodemailer.createTransport({
        host: this.configService.get('SMTP_HOST', 'smtp.gmail.com'),
        port: this.configService.get('SMTP_PORT', 587),
        secure: false,
        auth: { user, pass },
      });
      this.logger.log('Email service enabled with SMTP');
    } else {
      this.enabled = false;
      this.logger.warn('SMTP credentials missing. Email sending disabled (using console fallback)');
    }
  }

  async sendVerificationEmail(to: string, token: string) {
    const url = `${this.configService.get('FRONTEND_URL')}/verify-email?token=${token}`;
    const subject = 'Verify your email – PujaSewa';
    const html = `<h1>Welcome to PujaSewa</h1><p>Please verify your email by clicking: <a href="${url}">${url}</a></p>`;
    await this.sendEmail(to, subject, html);
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const url = `${this.configService.get('FRONTEND_URL')}/reset-password?token=${token}`;
    const subject = 'Reset your password – PujaSewa';
    const html = `<p>Click to reset: <a href="${url}">${url}</a></p>`;
    await this.sendEmail(to, subject, html);
  }

  // Generic sendEmail method for admin notifications
  async sendEmail(to: string, subject: string, text: string, html?: string) {
    if (this.enabled) {
      await this.transporter.sendMail({
        to,
        subject,
        text,
        html: html || text,
      });
    } else {
      this.logger.log(`[EMAIL FALLBACK] To: ${to}, Subject: ${subject}, Body: ${text}`);
    }
  }
}
