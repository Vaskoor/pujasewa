import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDecorationDto } from './dto/create-decoration.dto';

@Injectable()
export class DecorationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.decoration.findMany({ orderBy: { price: 'asc' } });
  }

  async findOne(id: string) {
    const d = await this.prisma.decoration.findUnique({ where: { id } });
    if (!d) throw new NotFoundException('Decoration not found.');
    return d;
  }

  create(dto: CreateDecorationDto) {
    const data = { ...dto, type: dto.type || "general" };
    return this.prisma.decoration.create({ data });
  }

  async update(id: string, dto: Partial<CreateDecorationDto>) {
    await this.findOne(id);
    return this.prisma.decoration.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.decoration.delete({ where: { id } });
  }
}
