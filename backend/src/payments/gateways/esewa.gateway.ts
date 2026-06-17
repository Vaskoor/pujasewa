import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as crypto from 'crypto';

@Injectable()
export class EsewaGateway {
  private readonly apiUrl = process.env.ESEWA_API_URL || 'https://esewa.com.np/api/epay';
  private readonly merchantCode = process.env.ESEWA_MERCHANT_CODE;
  private readonly secret = process.env.ESEWA_SECRET;

  constructor(private httpService: HttpService) {}

  async initiatePayment(amount: number, orderId: string, returnUrl: string) {
    const signature = crypto
      .createHash('sha256')
      .update(`total_amount=${amount},transaction_uuid=${orderId},product_code=${this.merchantCode}`)
      .digest('hex');
    const response = await firstValueFrom(
      this.httpService.post(`${this.apiUrl}/v2/initiate`, {
        amount: amount.toString(),
        tax_amount: '0',
        total_amount: amount.toString(),
        transaction_uuid: orderId,
        product_code: this.merchantCode,
        product_service_charge: '0',
        product_delivery_charge: '0',
        success_url: returnUrl,
        failure_url: returnUrl,
        signed_field_names: 'total_amount,transaction_uuid,product_code',
        signature,
      })
    );
    return response.data;
  }
}
