import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CmsService } from './cms.service';
import { CmsController } from './cms.controller';
import { SitemapController } from './sitemap.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    CacheModule.register(),
  ],
  controllers: [CmsController, SitemapController],
  providers: [CmsService],
})
export class CmsModule {}
