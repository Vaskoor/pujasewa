import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PhotographyService {
  constructor(private prisma: PrismaService) {}

  async getPackages() {
    return this.prisma.photographyPackage.findMany({
      where: { isActive: true },
      orderBy: { pricePerDay: 'asc' },
    });
  }

  async getPhotographers() {
    return this.prisma.photographer.findMany({
      where: { isActive: true },
      orderBy: { rating: 'desc' },
    });
  }
}
