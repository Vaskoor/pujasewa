import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post('khalti/initiate')
  async initiateKhalti(@Body('bookingId') bookingId: string, @Body('returnUrl') returnUrl: string) {
    return this.paymentsService.initiateKhaltiPayment(bookingId, returnUrl);
  }
}
