import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { CmsService } from './cms.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class SitemapController {
  constructor(
    private cmsService: CmsService,
    private prisma: PrismaService,
  ) {}

  @Get('sitemap.xml')
  async getSitemap(@Res() res: Response) {
    const baseUrl = process.env.FRONTEND_URL || 'https://pujasewa.com';

    // Static routes
    const staticRoutes = [
      '', '/pandits', '/packages', '/decorations', '/photography', '/venue',
      '/about', '/contact', '/faq', '/how-it-works', '/testimonials', '/blog',
      '/services', '/boutique', '/bridal-makeup', '/events-makeup', '/custom-puja',
    ];

    // Dynamic CMS pages
    const cmsPages = await this.cmsService.getAllForSitemap();
    const dynamicRoutes = cmsPages.map(page => ({
      loc: `/cms/${page.slug}`,
      lastmod: page.updatedAt.toISOString(),
    }));

    // Dynamic pandit profile pages (optional – you can limit to approved pandits)
    const pandits = await this.prisma.pandit.findMany({
      where: { isApproved: true },
      select: { id: true, updatedAt: true },
    });
    const panditRoutes = pandits.map(p => ({
      loc: `/pandit/${p.id}`,
      lastmod: p.updatedAt.toISOString(),
    }));

    // Build XML
    const urlSet = [...staticRoutes.map(route => ({ loc: route, lastmod: new Date().toISOString() })), ...dynamicRoutes, ...panditRoutes]
      .map(item => `
    <url>
      <loc>${baseUrl}${item.loc}</loc>
      <lastmod>${item.lastmod}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${item.loc === '' ? '1.0' : '0.8'}</priority>
    </url>`).join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  }
}
