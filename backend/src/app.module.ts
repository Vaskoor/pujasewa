import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PanditsModule } from './pandits/pandits.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AdminModule } from './admin/admin.module';
import { EventsModule } from './events/events.module';
import { InventoryModule } from './inventory/inventory.module';
import { DecorationsModule } from './decorations/decorations.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AiModule } from './ai/ai.module';
import { PrismaModule } from './prisma/prisma.module';
import { OrdersModule } from './orders/orders.module';
import { PackagesModule } from './packages/packages.module';
import { CmsModule } from './cms/cms.module';
import { AuditModule } from './audit/audit.module';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './common/logger/logger.module';
import { VenueModule } from './venue/venue.module';
import { CustomPujaModule } from './custom-puja/custom-puja.module';
import { PhotographyModule } from './photography/photography.module';
import { BridalMakeupModule } from "./bridal-makeup/bridal-makeup.module";
import { EventsMakeupModule } from "./events-makeup/events-makeup.module";
import { ServicesModule } from "./services/services.module";@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    LoggerModule,
    AuthModule,
    UsersModule,
    PanditsModule,
    BookingsModule,
    PaymentsModule,
    NotificationsModule,
    AdminModule,
    EventsModule,
    InventoryModule,
    DecorationsModule,
    ReviewsModule,
    AiModule,
    OrdersModule,
    PackagesModule,
    CmsModule,
    AuditModule,
    HealthModule,
    VenueModule,
    CustomPujaModule,
    PhotographyModule,
    BridalMakeupModule,
    EventsMakeupModule,    PrismaModule,
    ServicesModule,  ],
})
export class AppModule {}
