import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(customerId: string, dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        customerId,
        orderType: dto.orderType,
        totalAmount: dto.totalAmount,
        status: 'PENDING',
        items: dto.items,
      },
    });
  }

  async findByCustomer(customerId: string) {
    return this.prisma.order.findMany({ where: { customerId }, orderBy: { createdAt: 'desc' } });
  }
}
