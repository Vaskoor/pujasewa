import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService) {}

  async createVerificationToken(userId: string): Promise<string> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);
    await this.prisma.verificationToken.create({
      data: { token, userId, type: 'EMAIL_VERIFICATION', expiresAt },
    });
    return token;
  }

  async verifyEmail(token: string): Promise<boolean> {
    const record = await this.prisma.verificationToken.findFirst({
      where: { token, type: 'EMAIL_VERIFICATION', used: false, expiresAt: { gt: new Date() } },
    });
    if (!record) return false;
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: record.userId }, data: { isVerified: true } }),
      this.prisma.verificationToken.update({ where: { id: record.id }, data: { used: true } }),
    ]);
    return true;
  }

  async createPasswordResetToken(userId: string): Promise<string> {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
    await this.prisma.verificationToken.create({
      data: { token, userId, type: 'PASSWORD_RESET', expiresAt },
    });
    return token;
  }

  async validatePasswordResetToken(token: string): Promise<string | null> {
    const record = await this.prisma.verificationToken.findFirst({
      where: { token, type: 'PASSWORD_RESET', used: false, expiresAt: { gt: new Date() } },
    });
    if (!record) return null;
    return record.userId;
  }

  async consumePasswordResetToken(token: string): Promise<void> {
    await this.prisma.verificationToken.updateMany({
      where: { token, type: 'PASSWORD_RESET' },
      data: { used: true },
    });
  }
}
