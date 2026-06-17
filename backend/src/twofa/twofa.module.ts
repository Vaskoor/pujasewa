import { Module } from '@nestjs/common';
import { TwofaService } from './twofa.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [TwofaService],
  exports: [TwofaService],
})
export class TwofaModule {}
