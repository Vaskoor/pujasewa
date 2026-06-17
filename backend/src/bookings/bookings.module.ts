import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingService } from './booking.service';
import { PrismaModule } from '../prisma/prisma.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { AvailabilityGateway } from '../gateways/availability.gateway';

@Module({
  imports: [PrismaModule, NotificationsModule],
  controllers: [BookingsController],
  providers: [BookingService, AvailabilityGateway],
  exports: [BookingService],
})
export class BookingsModule {}
