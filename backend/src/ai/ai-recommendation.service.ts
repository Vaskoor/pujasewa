import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiRecommendationService {
  constructor(private prisma: PrismaService) {}

  // Simple rule-based recommendation (can be replaced with ML later)
  async recommendPandit(eventType: string, district: string, budget?: number) {
    const pandits = await this.prisma.pandit.findMany({
      where: {
        isApproved: true,
        specializations: { some: { eventType: { name: eventType } } },
        user: { profile: { district } },
      },
      include: { user: { include: { profile: true } }, reviews: true },
      take: 5,
    });
    // Sort by rating and experience
    return pandits.sort((a, b) => b.rating - a.rating || b.experienceYears - a.experienceYears);
  }

  async recommendPackage(eventType: string, budget: number) {
    const packages = await this.prisma.package.findMany({
      where: { isActive: true, price: { lte: budget } },
      orderBy: { price: 'asc' },
    });
    return packages;
  }
}
