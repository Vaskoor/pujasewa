import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async sendEmail(to: string, subject: string, text: string) {
    console.log(`[EMAIL] To: ${to}, Subject: ${subject}, Body: ${text}`);
    // Store notification for the pandit (using recipientPanditId)
    await this.prisma.notification.create({
      data: {
        recipientPanditId: to,  // assuming 'to' is pandit's userId or identifier
        type: 'email',
        title: subject,
        body: text,
        read: false,
      },
    });
  }

  async sendSms(to: string, message: string) {
    console.log(`[SMS] To: ${to}, Message: ${message}`);
    await this.prisma.notification.create({
      data: {
        recipientPanditId: to,
        type: 'sms',
        title: 'SMS',
        body: message,
        read: false,
      },
    });
  }

  async sendPush(userId: string, title: string, message: string) {
    console.log(`[PUSH] User: ${userId}, Title: ${title}, Message: ${message}`);
    await this.prisma.notification.create({
      data: {
        recipientPanditId: userId,
        type: 'push',
        title: title,
        body: message,
        read: false,
      },
    });
  }

  async getUnread(userId: string) {
    return this.prisma.notification.findMany({
      where: { recipientPanditId: userId, read: false },
    });
  }

  async markAsRead(notificationId: string) {
    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { read: true },
    });
  }
}
