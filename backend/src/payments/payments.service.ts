import { Injectable } from '@nestjs/common';
import { KhaltiGateway } from './gateways/khalti.gateway';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(
    private khaltiGateway: KhaltiGateway,
    private prisma: PrismaService,
  ) {}

  async initiateKhaltiPayment(bookingId: string, returnUrl: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) throw new Error('Booking not found');
    const payment = await this.prisma.payment.create({
      data: {
        bookingId,
        amount: booking.totalAmount,
        gateway: 'KHALTI',
        transactionId: `txn_${Date.now()}`,
        status: 'PENDING',
      },
    });
    const response = await this.khaltiGateway.initiatePayment(booking.totalAmount, payment.id, returnUrl);
    return { paymentUrl: response.payment_url, pidx: response.pidx };
  }
}
