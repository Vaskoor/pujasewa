import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCmsPageDto } from './dto/create-cms-page.dto';

@Injectable()
export class CmsService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getPage(slug: string) {
    const cacheKey = `cms:${slug}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const page = await this.prisma.cmsPage.findUnique({ where: { slug } });
    if (page) {
      await this.cacheManager.set(cacheKey, page, 3600); // cache for 1 hour
    }
    return page;
  }

  async createOrUpdate(slug: string, dto: CreateCmsPageDto) {
    const result = await this.prisma.cmsPage.upsert({
      where: { slug },
      update: dto,
      create: { slug, ...dto },
    });
    // Invalidate cache
    await this.cacheManager.del(`cms:${slug}`);
    return result;
  }

  async list() {
    return this.prisma.cmsPage.findMany({ select: { slug: true, title: true, updatedAt: true } });
  }

  async getAllForSitemap() {
    return this.prisma.cmsPage.findMany({
      select: { slug: true, updatedAt: true },
    });
  }
}
