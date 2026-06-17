import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { VenueService } from './venue.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('venue')
export class VenueController {
  constructor(private venueService: VenueService) {}

  @Public()
  @Get()
  async getAll() {
    return this.venueService.findAll();
  }

  @Public()
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.venueService.findOne(id);
  }

  @Public()
  @Post('inquiry')
  async createInquiry(@Body() data: any) {
    // For now, just log and return success (you can later store in a VenueInquiry model)
    console.log('Venue inquiry:', data);
    return { success: true, message: 'Inquiry received. We will contact you soon.' };
  }
}
