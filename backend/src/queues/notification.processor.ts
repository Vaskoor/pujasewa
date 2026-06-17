import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { NotificationsService } from '../notifications/notifications.service';

@Processor('notifications')
export class NotificationProcessor {
  constructor(private notificationsService: NotificationsService) {}

  @Process('email')
  async handleEmail(job: Job) {
    const { to, subject, text } = job.data;
    await this.notificationsService.sendEmail(to, subject, text);
  }

  @Process('sms')
  async handleSms(job: Job) {
    const { to, message } = job.data;
    await this.notificationsService.sendSms(to, message);
  }
}
