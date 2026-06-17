import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TokenService } from '../token/token.service';
import { EmailService } from '../email/email.service';
import { TwofaService } from '../twofa/twofa.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private tokenService: TokenService,
    private emailService: EmailService,
    private twofaService: TwofaService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { phone: dto.phone }] },
    });
    if (existingUser) throw new ConflictException('User already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const isVerified = !process.env.SMTP_USER || !process.env.SMTP_PASS;

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        phone: dto.phone,
        passwordHash: hashedPassword,
        role: dto.role || 'CUSTOMER',
        isVerified,
        profile: { create: { fullName: dto.fullName } },
      },
      include: { profile: true },
    });

    if (dto.role === 'PANDIT') {
      await this.prisma.pandit.create({
        data: { userId: user.id, verificationStatus: 'PENDING' },
      });
    }

    if (process.env.SMTP_USER && process.env.SMTP_PASS && !isVerified) {
      const verificationToken = await this.tokenService.createVerificationToken(user.id);
      await this.emailService.sendVerificationEmail(user.email, verificationToken);
    }

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return { user, ...tokens };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { profile: true, pandit: true },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.isVerified) throw new UnauthorizedException('Please verify your email before logging in');

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return { user, ...tokens };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
      
      // Find and revoke the used refresh token (one-time use)
      const storedToken = await this.prisma.refreshToken.findFirst({
        where: { tokenHash, revoked: false, expiresAt: { gt: new Date() } },
      });
      if (!storedToken) throw new UnauthorizedException('Invalid refresh token');

      // Revoke the used token
      await this.prisma.refreshToken.update({
        where: { id: storedToken.id },
        data: { revoked: true },
      });

      // Check for token reuse (if a token with same family already revoked, invalidate all user tokens)
      const family = storedToken.family || storedToken.id;
      const reused = await this.prisma.refreshToken.findFirst({
        where: { family, revoked: true, userId: payload.sub },
      });
      if (reused) {
        // Possible theft – revoke all user tokens
        await this.prisma.refreshToken.updateMany({
          where: { userId: payload.sub, revoked: false },
          data: { revoked: true },
        });
        throw new UnauthorizedException('Token reuse detected – please login again');
      }

      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user) throw new UnauthorizedException();

      return this.generateTokens(user.id, user.email, user.role, family);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private async generateTokens(userId: string, email: string, role: string, family?: string) {
    const refreshToken = this.jwtService.sign(
      { sub: userId },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
    );
    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const newFamily = family || crypto.randomBytes(16).toString('hex');

    // Revoke all existing refresh tokens for this user (optional – to enforce single session)
    await this.prisma.refreshToken.updateMany({
      where: { userId, revoked: false },
      data: { revoked: true },
    });

    await this.prisma.refreshToken.create({
      data: {
        tokenHash,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        family: newFamily,
        revoked: false,
      },
    });

    const accessToken = this.jwtService.sign(
      { sub: userId, email, role },
      { secret: process.env.JWT_SECRET, expiresIn: '15m' },
    );
    return { accessToken, refreshToken };
  }

  async verifyEmail(token: string): Promise<boolean> {
    return this.tokenService.verifyEmail(token);
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return;
    const resetToken = await this.tokenService.createPasswordResetToken(user.id);
    await this.emailService.sendPasswordResetEmail(email, resetToken);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const userId = await this.tokenService.validatePasswordResetToken(token);
    if (!userId) throw new BadRequestException('Invalid or expired token');
    const hashed = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({ where: { id: userId }, data: { passwordHash: hashed } });
    await this.tokenService.consumePasswordResetToken(token);
  }

  async logout(userId: string): Promise<void> {
    await this.prisma.refreshToken.updateMany({
      where: { userId, revoked: false },
      data: { revoked: true },
    });
  }

  async generateTwoFactorSecret(userId: string) {
    return this.twofaService.generateTwoFactorSecret(userId);
  }

  async enableTwoFactor(userId: string, token: string) {
    return this.twofaService.enableTwoFactor(userId, token);
  }

  async disableTwoFactor(userId: string, token: string) {
    return this.twofaService.disableTwoFactor(userId, token);
  }

  async verifyTwoFactorToken(userId: string, token: string) {
    return this.twofaService.verifyTwoFactorToken(userId, token);
  }
}
