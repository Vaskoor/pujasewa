import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private enabled: boolean;
  private apiUrl: string;
  private apiKey: string;
  private senderId: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = this.configService.get('SMS_API_URL');
    this.apiKey = this.configService.get('SMS_API_KEY');
    this.senderId = this.configService.get('SMS_SENDER_ID', 'PujaSewa');
    this.enabled = !!(this.apiUrl && this.apiKey);
    if (!this.enabled) {
      this.logger.warn('SMS credentials missing. SMS sending disabled (using console fallback)');
    }
  }

  async sendSms(to: string, message: string): Promise<boolean> {
    const phone = to.replace(/^0/, '977'); // Ensure Nepal format
    if (!this.enabled) {
      this.logger.log(`[SMS FALLBACK] To: ${phone}, Message: ${message}`);
      return false;
    }

    try {
      // Example for Sparrow SMS – replace with actual provider endpoint
      const response = await axios.post(this.apiUrl, {
        token: this.apiKey,
        from: this.senderId,
        to: phone,
        text: message,
      });
      if (response.data?.status === 'success') {
        this.logger.log(`SMS sent to ${phone}`);
        return true;
      }
      this.logger.error(`SMS failed: ${response.data?.message || 'Unknown error'}`);
      return false;
    } catch (error) {
      this.logger.error(`SMS sending error to ${phone}: ${error.message}`);
      return false;
    }
  }
}
