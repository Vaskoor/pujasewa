import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePackageDto } from './dto/create-package.dto';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.package.findMany({ where: { isActive: true } });
  }

  async findOne(id: string) {
    return this.prisma.package.findUnique({ where: { id } });
  }

  async create(dto: CreatePackageDto, adminId: string) {
    return this.prisma.package.create({ data: { ...dto, createdBy: adminId } });
  }
}
