import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('packages')
export class PackagesController {
  constructor(private packagesService: PackagesService) {}

  @Public()
  @Get()
  async list() {
    return this.packagesService.findAll();
  }

  @Public()
  @Get(':id')
  async get(@Param('id') id: string) {
    return this.packagesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async create(@Body() dto: CreatePackageDto) {
    return this.packagesService.create(dto, 'admin-id');
  }
}
