import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from "../token/token.module";
import { EmailModule } from "../email/email.module";
import { TwofaModule } from "../twofa/twofa.module";import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    TokenModule,
    EmailModule,
    TwofaModule,
    PassportModule,
    JwtModule.register({}),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshStrategy],
})
export class AuthModule {}
