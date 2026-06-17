import { Controller, Get, Post, Body } from '@nestjs/common';
import { PhotographyService } from './photography.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('photography')
export class PhotographyController {
  constructor(private photographyService: PhotographyService) {}

  @Public()
  @Get()
  async getAll() {
    const packages = await this.photographyService.getPackages();
    const photographers = await this.photographyService.getPhotographers();
    return { packages, photographers };
  }

  @Public()
  @Get('packages')
  async getPackages() {
    return this.photographyService.getPackages();
  }

  @Public()
  @Get('photographers')
  async getPhotographers() {
    return this.photographyService.getPhotographers();
  }

  @Public()
  @Post('inquiry')
  async createInquiry(@Body() data: any) {
    // For now, just log and return success (you can store in a PhotographyInquiry model later)
    console.log('Photography inquiry:', data);
    return { success: true, message: 'Inquiry received. We will contact you soon.' };
  }
}
