import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryItemDto } from './dto/create-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.inventory.findMany();
  }

  async create(dto: CreateInventoryItemDto) {
    return this.prisma.inventory.create({ data: dto });
  }

  async updateStock(id: string, quantity: number) {
    return this.prisma.inventory.update({
      where: { id },
      data: { stockQuantity: quantity },
    });
  }

  async delete(id: string) {
    return this.prisma.inventory.delete({ where: { id } });
  }
}
