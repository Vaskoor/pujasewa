import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePanditProfileDto } from './dto/create-pandit-profile.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Injectable()
export class PanditsService {
  constructor(private prisma: PrismaService) {}

  async searchPandits(filters: any) {
    const where: any = { isApproved: true };
    if (filters.eventType) {
      where.specializations = { some: { eventType: { name: filters.eventType } } };
    }
    if (filters.district) {
      where.user = { profile: { district: filters.district } };
    }
    return this.prisma.pandit.findMany({
      where,
      include: { user: { include: { profile: true } }, specializations: { include: { eventType: true } } },
    });
  }

  async getPanditById(id: string) {
    const pandit = await this.prisma.pandit.findUnique({
      where: { id },
      include: { user: { include: { profile: true } }, specializations: { include: { eventType: true } }, availabilitySlots: true },
    });
    if (!pandit) throw new NotFoundException('Pandit not found');
    return pandit;
  }

  async createOrUpdateProfile(userId: string, dto: CreatePanditProfileDto) {
    const pandit = await this.prisma.pandit.findUnique({ where: { userId } });
    if (!pandit) throw new ForbiddenException('Not a pandit account');
    return this.prisma.pandit.update({
      where: { userId },
      data: {
        bio: dto.bio,
        experienceYears: dto.experienceYears,
        specializations: {
          deleteMany: {},
          create: dto.specializationIds.map(eventTypeId => ({ eventTypeId })),
        },
      },
    });
  }

  async updateAvailability(panditId: string, dto: UpdateAvailabilityDto) {
    await this.prisma.availabilitySlot.deleteMany({
      where: { panditId, date: { gte: dto.startDate, lte: dto.endDate } },
    });
    const slots = [];
    let currentDate = new Date(dto.startDate);
    const endDate = new Date(dto.endDate);
    while (currentDate <= endDate) {
      slots.push({
        panditId,
        date: currentDate,
        startTime: dto.startTime,
        endTime: dto.endTime,
        isBooked: false,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return this.prisma.availabilitySlot.createMany({ data: slots });
    const { AvailabilityGateway } = require("../gateways/availability.gateway");
    const gateway = new AvailabilityGateway();
    gateway.notifyAvailabilityUpdate(panditId);  }

  async getAvailabilityByUserId(userId: string) {
    const pandit = await this.prisma.pandit.findUnique({ where: { userId }, select: { id: true } });
    if (!pandit) throw new ForbiddenException('Pandit profile not found');
    return this.prisma.availabilitySlot.findMany({
      where: { panditId: pandit.id },
      orderBy: { date: 'asc' }
    });
  }

  async getEarnings(userId: string) {
    const pandit = await this.prisma.pandit.findUnique({ where: { userId }, select: { id: true } });
    if (!pandit) throw new ForbiddenException('Pandit profile not found');
    const completedBookings = await this.prisma.booking.findMany({
      where: { panditId: pandit.id, status: 'COMPLETED', payments: { some: { status: 'SUCCESS' } } },
      include: { payments: true, eventType: true }
    });
    const total = completedBookings.reduce((sum, b) => sum + b.totalAmount, 0);
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const thisMonth = completedBookings
      .filter(b => b.eventDate >= startOfMonth && b.eventDate <= endOfMonth)
      .reduce((sum, b) => sum + b.totalAmount, 0);
    const pendingBookings = await this.prisma.booking.findMany({
      where: { panditId: pandit.id, status: { in: ['PENDING','ACCEPTED','CONFIRMED','IN_PROGRESS'] }, paymentStatus: { in: ['ADVANCE_PAID','FULL_PAID'] } }
    });
    const pending = pendingBookings.reduce((sum, b) => sum + b.totalAmount, 0);
    return { total, thisMonth, pending, bookings: completedBookings.map(b => ({ id: b.id, eventType: b.eventType, eventDate: b.eventDate, amount: b.totalAmount })) };
  }
}
