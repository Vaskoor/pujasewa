import { Controller, Get, Put, Body, UseGuards, Request, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.userId);
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.userId, dto);
  }

  @Get('bookings')
  async getBookings(@Request() req) {
    return this.usersService.getBookingHistory(req.user.userId);
  }

  @Post('change-password')
  async changePassword(@Request() req, @Body() body: { oldPassword: string; newPassword: string }) {
    return this.usersService.changePassword(req.user.userId, body.oldPassword, body.newPassword);
  }
}
