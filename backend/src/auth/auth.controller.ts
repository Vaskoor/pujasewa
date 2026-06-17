import { Controller, Post, Body, HttpCode, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Public } from '../common/decorators/public.decorator';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 attempts per minute
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 10, ttl: 60000 } }) // 10 attempts per minute
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  async refresh(@Body() { refreshToken }: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshToken);
  }

  @Public()
  @Post('verify-email')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async verifyEmail(@Body('token') token: string) {
    const success = await this.authService.verifyEmail(token);
    return { success };
  }

  @Public()
  @Post('forgot-password')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async forgotPassword(@Body('email') email: string) {
    await this.authService.forgotPassword(email);
    return { message: 'If the email exists, a reset link has been sent.' };
  }

  @Public()
  @Post('reset-password')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async resetPassword(@Body('token') token: string, @Body('newPassword') newPassword: string) {
    await this.authService.resetPassword(token, newPassword);
    return { message: 'Password updated successfully' };
  }

  @Post('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user.userId);
    return { message: 'Logged out' };
  }

  @Post('2fa/generate')
  async generate2fa(@Request() req) {
    return this.authService.generateTwoFactorSecret(req.user.userId);
  }

  @Post('2fa/enable')
  async enable2fa(@Request() req, @Body('token') token: string) {
    const success = await this.authService.enableTwoFactor(req.user.userId, token);
    return { success };
  }

  @Post('2fa/disable')
  async disable2fa(@Request() req, @Body('token') token: string) {
    const success = await this.authService.disableTwoFactor(req.user.userId, token);
    return { success };
  }

  @Public()
  @Post('2fa/verify')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async verify2fa(@Body('userId') userId: string, @Body('token') token: string) {
    const valid = await this.authService.verifyTwoFactorToken(userId, token);
    return { valid };
  }
}
