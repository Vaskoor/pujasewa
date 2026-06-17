import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CmsService } from './cms.service';
import { CreateCmsPageDto } from './dto/create-cms-page.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';

@Controller('cms')
export class CmsController {
  constructor(private cmsService: CmsService) {}

  @Public()
  @Get(':slug')
  async getPage(@Param('slug') slug: string) {
    return this.cmsService.getPage(slug);
  }

  @Public()
  @Get()
  async listPages() {
    return this.cmsService.list();
  }

  @Post(':slug')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async savePage(@Param('slug') slug: string, @Body() dto: CreateCmsPageDto) {
    return this.cmsService.createOrUpdate(slug, dto);
  }
}
