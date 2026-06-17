import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KhaltiGateway {
  private readonly apiUrl = process.env.KHALTI_API_URL;
  private readonly secretKey = process.env.KHALTI_SECRET_KEY;

  constructor(private httpService: HttpService) {}

  async initiatePayment(amount: number, purchaseOrderId: string, returnUrl: string) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.apiUrl}/epayment/initiate/`, {
        return_url: returnUrl,
        website_url: process.env.FRONTEND_URL,
        amount: amount * 100,
        purchase_order_id: purchaseOrderId,
        purchase_order_name: 'Puja Booking',
        customer_info: {},
      }, {
        headers: { Authorization: `Key ${this.secretKey}` },
      })
    );
    return response.data;
  }

  async verifyPayment(pidx: string) {
    const response = await firstValueFrom(
      this.httpService.post(`${this.apiUrl}/epayment/lookup/`, { pidx }, {
        headers: { Authorization: `Key ${this.secretKey}` },
      })
    );
    return response.data;
  }
}
