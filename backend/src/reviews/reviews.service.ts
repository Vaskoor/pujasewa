import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(customerId: string, dto: CreateReviewDto) {
    return this.prisma.review.create({
      data: { ...dto, customerId, isApproved: false },
    });
  }

  async getByPandit(panditId: string) {
    return this.prisma.review.findMany({
      where: { panditId, isApproved: true },
      include: { customer: { include: { profile: true } } },
    });
  }

  async moderate(reviewId: string, approve: boolean) {
    return this.prisma.review.update({
      where: { id: reviewId },
      data: { isApproved: approve },
    });
  }
}
