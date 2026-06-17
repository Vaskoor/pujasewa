import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async getServiceItems() {
    return this.prisma.serviceItem.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async getWhyChooseUs() {
    return this.prisma.whyChooseUsItem.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }

  async getPromoPackages() {
    return this.prisma.promoPackage.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
  }
}
