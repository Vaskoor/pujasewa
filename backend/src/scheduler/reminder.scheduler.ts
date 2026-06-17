import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class ReminderScheduler {
  private readonly logger = new Logger(ReminderScheduler.name);

  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  @Cron('0 8 * * *')
  async sendDailyReminders() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startOfDay = new Date(tomorrow.setHours(0, 0, 0, 0));
    const endOfDay = new Date(tomorrow.setHours(23, 59, 59, 999));

    const bookings = await this.prisma.booking.findMany({
      where: {
        eventDate: { gte: startOfDay, lte: endOfDay },
        status: { in: ['CONFIRMED', 'ACCEPTED'] },
      },
      include: { customer: true },
    });

    for (const booking of bookings) {
      await this.notifications.sendEmail(
        booking.customer.email,
        'Upcoming Event Reminder',
        `Your event is tomorrow at ${booking.eventTime}.`
      );
      this.logger.log(`Reminder sent for booking ${booking.id}`);
    }
  }
}
