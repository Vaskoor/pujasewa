import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsMakeupService {
  constructor(private prisma: PrismaService) {}

  async getServices() {
    return this.prisma.eventsMakeupService.findMany({
      where: { isActive: true },
      orderBy: { price: 'asc' },
    });
  }
}
