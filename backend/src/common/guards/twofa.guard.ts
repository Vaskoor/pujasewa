import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TwoFactorGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) return false;

    // Only enforce for admin role
    if (user.role === 'ADMIN') {
      const dbUser = await this.prisma.user.findUnique({
        where: { id: user.userId },
        select: { twoFactorEnabled: true },
      });
      if (!dbUser || !dbUser.twoFactorEnabled) {
        throw new ForbiddenException('Admin accounts must enable Two-Factor Authentication. Please set up 2FA first.');
      }
    }
    return true;
  }
}
