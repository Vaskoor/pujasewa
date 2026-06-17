import { Controller, Get } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Public } from '../common/decorators/public.decorator';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @Public()
  @Get()
  async getAll() {
    const services = await this.servicesService.getServiceItems();
    const whyChooseUs = await this.servicesService.getWhyChooseUs();
    const promoPackages = await this.servicesService.getPromoPackages();
    return { services, whyChooseUs, promoPackages };
  }
}
