import { Controller, Get, Query, Param, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PanditsService } from './pandits.service';
import { CreatePanditProfileDto } from './dto/create-pandit-profile.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('pandits')
export class PanditsController {
  constructor(private panditsService: PanditsService) {}

  @Public()
  @Get()
  async search(@Query() filters: any) {
    return this.panditsService.searchPandits(filters);
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.panditsService.getPanditById(id);
  }

  @Post('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PANDIT')
  async updateProfile(@Request() req, @Body() dto: CreatePanditProfileDto) {
    return this.panditsService.createOrUpdateProfile(req.user.userId, dto);
  }

  @Post('availability')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PANDIT')
  async setAvailability(@Request() req, @Body() dto: UpdateAvailabilityDto) {
    const pandit = await this.panditsService.getPanditById(req.user.userId);
    return this.panditsService.updateAvailability(pandit.id, dto);
  }

  @Get('me/availability')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PANDIT')
  async getMyAvailability(@Request() req) {
    return this.panditsService.getAvailabilityByUserId(req.user.userId);
  }

  @Get('me/earnings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PANDIT')
  async getEarnings(@Request() req) {
    return this.panditsService.getEarnings(req.user.userId);
  }
}
