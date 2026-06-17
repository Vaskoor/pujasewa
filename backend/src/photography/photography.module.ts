import { Module } from '@nestjs/common';
import { PhotographyController } from './photography.controller';
import { PhotographyService } from './photography.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PhotographyController],
  providers: [PhotographyService],
})
export class PhotographyModule {}
