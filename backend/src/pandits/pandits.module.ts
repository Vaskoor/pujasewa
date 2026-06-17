import { Module } from '@nestjs/common';
import { PanditsService } from './pandits.service';
import { PanditsController } from './pandits.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PanditsController],
  providers: [PanditsService],
})
export class PanditsModule {}
