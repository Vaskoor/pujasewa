import { Module } from '@nestjs/common';
import { DecorationsService } from './decorations.service';
import { DecorationsController } from './decorations.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DecorationsController],
  providers: [DecorationsService],
  exports: [DecorationsService],
})
export class DecorationsModule {}
