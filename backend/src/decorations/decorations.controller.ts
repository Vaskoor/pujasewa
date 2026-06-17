import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { DecorationsService } from './decorations.service';
import { CreateDecorationDto } from './dto/create-decoration.dto';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('decorations')
export class DecorationsController {
  constructor(private readonly svc: DecorationsService) {}

  @Public() @Get()        findAll()              { return this.svc.findAll(); }
  @Public() @Get(':id')   findOne(@Param('id') id: string) { return this.svc.findOne(id); }

  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN')
  @Post()    create(@Body() dto: CreateDecorationDto) { return this.svc.create(dto); }

  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN')
  @Patch(':id') update(@Param('id') id: string, @Body() dto: Partial<CreateDecorationDto>) { return this.svc.update(id, dto); }

  @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN')
  @Delete(':id') remove(@Param('id') id: string) { return this.svc.remove(id); }
}
