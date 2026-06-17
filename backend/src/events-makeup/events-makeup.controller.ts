import { Controller, Get } from '@nestjs/common';
import { EventsMakeupService } from './events-makeup.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('events-makeup')
export class EventsMakeupController {
  constructor(private eventsMakeupService: EventsMakeupService) {}

  @Public()
  @Get()
  async getServices() {
    return this.eventsMakeupService.getServices();
  }
}
