import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VenueService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.venue.findMany({
      where: { isActive: true },
      orderBy: { pricePerDay: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.venue.findUnique({ where: { id } });
  }
}
