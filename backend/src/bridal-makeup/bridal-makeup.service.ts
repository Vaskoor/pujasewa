import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BridalMakeupService {
  constructor(private prisma: PrismaService) {}

  async getArtists() {
    return this.prisma.bridalMakeupArtist.findMany({
      where: { isActive: true },
      orderBy: { rating: 'desc' },
    });
  }
}
