import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true, pandit: true },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto & { phone?: string }) {
    const { phone, ...profileData } = dto;
    if (phone) {
      await this.prisma.user.update({ where: { id: userId }, data: { phone } });
    }
    return this.prisma.profile.update({
      where: { userId },
      data: profileData,
    });
  }

  async getBookingHistory(userId: string) {
    return this.prisma.booking.findMany({
      where: { customerId: userId },
      include: { pandit: { include: { user: { include: { profile: true } } } }, eventType: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException('Current password is incorrect');
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({ where: { id: userId }, data: { passwordHash: hashed } });
    return { message: 'Password updated successfully' };
  }
}
