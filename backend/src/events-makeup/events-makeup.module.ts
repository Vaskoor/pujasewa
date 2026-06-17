import { Module } from '@nestjs/common';
import { EventsMakeupController } from './events-makeup.controller';
import { EventsMakeupService } from './events-makeup.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EventsMakeupController],
  providers: [EventsMakeupService],
})
export class EventsMakeupModule {}
