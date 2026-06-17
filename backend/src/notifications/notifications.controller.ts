import { Controller, Get, Patch, Param, Request, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly ns: NotificationService) {}

  @Get('unread')
  unread(@Request() req: any) {
    return this.ns.getUnread(req.user.panditProfile?.id);
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string) {
    return this.ns.markRead(id);
  }
}
