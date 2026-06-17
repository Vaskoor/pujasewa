import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventTypeDto } from './dto/create-event-type.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.eventType.findMany({ where: { isActive: true } });
  }

  async create(dto: CreateEventTypeDto, adminId: string) {
    return this.prisma.eventType.create({
      data: { ...dto, createdBy: adminId },
    });
  }

  async update(id: string, dto: Partial<CreateEventTypeDto>) {
    return this.prisma.eventType.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    return this.prisma.eventType.update({ where: { id }, data: { isActive: false } });
  }
}
