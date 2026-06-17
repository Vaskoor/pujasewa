import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(userId: string | null, action: string, entity: string, entityId?: string, oldValue?: any, newValue?: any) {
    return this.prisma.auditLog.create({
      data: { userId, action, entity, entityId, oldValue, newValue },
    });
  }

  async getLogs(entity?: string, entityId?: string) {
    return this.prisma.auditLog.findMany({
      where: { entity, entityId },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }
}
