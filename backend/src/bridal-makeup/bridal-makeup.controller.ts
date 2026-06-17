import { Controller, Get } from '@nestjs/common';
import { BridalMakeupService } from './bridal-makeup.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('bridal-makeup')
export class BridalMakeupController {
  constructor(private bridalMakeupService: BridalMakeupService) {}

  @Public()
  @Get()
  async getArtists() {
    return this.bridalMakeupService.getArtists();
  }
}
