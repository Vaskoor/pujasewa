import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AiRecommendationService } from './ai-recommendation.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private aiService: AiRecommendationService) {}

  @Get('recommend-pandit')
  async recommendPandit(@Query('eventType') eventType: string, @Query('district') district: string) {
    return this.aiService.recommendPandit(eventType, district);
  }

  @Get('recommend-package')
  async recommendPackage(@Query('eventType') eventType: string, @Query('budget') budget: number) {
    return this.aiService.recommendPackage(eventType, budget);
  }
}
