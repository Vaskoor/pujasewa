import { Controller, Post, Body } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';

@Controller('custom-puja')
export class CustomPujaController {
  @Public()
  @Post('inquiry')
  async createInquiry(@Body() data: any) {
    console.log('Custom puja inquiry:', data);
    // Store in DB if needed, or send email/sms
    return { success: true, message: 'Inquiry received. We will contact you soon.' };
  }
}
