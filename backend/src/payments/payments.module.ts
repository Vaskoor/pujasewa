import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { KhaltiGateway } from './gateways/khalti.gateway';
import { EsewaGateway } from './gateways/esewa.gateway';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [KhaltiGateway, EsewaGateway, PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
