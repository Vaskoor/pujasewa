import { Module } from '@nestjs/common';
import { BridalMakeupController } from './bridal-makeup.controller';
import { BridalMakeupService } from './bridal-makeup.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BridalMakeupController],
  providers: [BridalMakeupService],
})
export class BridalMakeupModule {}
