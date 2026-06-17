import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface PanditNotificationPayload {
  bookingId:  string;
  eventType:  string;
  district:   string;
  address:    string;
  eventDate:  Date;
  duration:   number;
  message?:   string;
  panditPhone?: string; // added
}

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async notifyPandit(panditId: string, payload: PanditNotificationPayload) {
    try {
      await (this.prisma as any).notification.create({
        data: {
          recipientPanditId: panditId,
          type:    'BOOKING_ASSIGNED',
          title:   `New Booking: ${payload.eventType}`,
          body:    `${payload.eventType} on ${payload.eventDate.toLocaleDateString()} at ${payload.address}, ${payload.district}. Duration: ${payload.duration} min.${payload.message ? ' ' + payload.message : ''}`,
          metadata: JSON.stringify({
            bookingId: payload.bookingId,
            eventType: payload.eventType,
            district:  payload.district,
            address:   payload.address,
            eventDate: payload.eventDate,
            duration:  payload.duration,
          }),
          read: false,
        },
      }).catch(() => {
        this.logger.warn('Notification table not found, skipping persist.');
      });

      this.logger.log(`Pandit ${panditId} notified for booking ${payload.bookingId}`);
    } catch (err) {
      this.logger.error('Failed to notify pandit', err);
    }
  }

  async getUnread(panditId: string) {
    return (this.prisma as any).notification
      .findMany({ where: { recipientPanditId: panditId, read: false }, orderBy: { createdAt: 'desc' } })
      .catch(() => []);
  }

  async markRead(notificationId: string) {
    return (this.prisma as any).notification
      .update({ where: { id: notificationId }, data: { read: true } })
      .catch(() => null);
  }
}
