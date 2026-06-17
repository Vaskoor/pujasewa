import { Module } from '@nestjs/common';
import { AiRecommendationService } from './ai-recommendation.service';
import { AiController } from './ai.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AiRecommendationService],
  controllers: [AiController],
})
export class AiModule {}
