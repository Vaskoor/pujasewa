import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async getStats() {
    const [users, pandits, bookings, revenue] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.pandit.count(),
      this.prisma.booking.count(),
      this.prisma.booking.aggregate({
        _sum: { totalAmount: true },
        where: { paymentStatus: 'FULL_PAID' },
      }),
    ]);

    const recentBookings = await this.prisma.booking.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      include: { pandit: { include: { user: { include: { profile: true } } } } },
    });

    const safe = recentBookings.map(b => {
      const { phone, altPhone, ...rest } = b as any;
      return rest;
    });

    return {
      totalUsers:    users,
      totalPandits:  pandits,
      totalBookings: bookings,
      totalRevenue:  revenue._sum.totalAmount ?? 0,
      recentBookings: safe,
    };
  }

  async getPendingPayments() {
    return this.prisma.booking.findMany({
      where: { paymentStatus: 'UNPAID', status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
    });
  }

  async confirmPaymentAdmin(bookingId: string) {
    return this.prisma.booking.update({
      where: { id: bookingId },
      data:  { paymentStatus: 'FULL_PAID', status: 'CONFIRMED' },
    });
  }

  // ---- New admin endpoints for pandit approval ----
  async getUnapprovedPandits() {
    return this.prisma.pandit.findMany({
      where: { isApproved: false },
      include: {
        user: {
          include: { profile: true },
        },
        specializations: { include: { eventType: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approvePandit(panditId: string, approve: boolean, adminNote?: string) {
    const pandit = await this.prisma.pandit.findUnique({
      where: { id: panditId },
      include: { user: { include: { profile: true } } },
    });
    if (!pandit) throw new NotFoundException('Pandit not found');

    const updated = await this.prisma.pandit.update({
      where: { id: panditId },
      data: { isApproved: approve, verificationStatus: approve ? 'VERIFIED' : 'REJECTED' },
      include: { user: { include: { profile: true } } },
    });

    // Send email notification to pandit
    const userEmail = pandit.user.email;
    const panditName = pandit.user.profile?.fullName || 'Pandit';
    if (userEmail) {
      const subject = approve
        ? 'Your Pandit profile has been approved!'
        : 'Update on your Pandit profile application';
      const text = approve
        ? `Dear ${panditName},\n\nCongratulations! Your Pandit profile on PujaSewa has been approved. You can now receive booking requests. Please login to complete your availability settings.\n\nThank you,\nPujaSewa Team`
        : `Dear ${panditName},\n\nWe have reviewed your Pandit profile. Unfortunately, it could not be approved at this time${adminNote ? ` Reason: ${adminNote}` : ''}. Please contact support for more information.\n\nThank you,\nPujaSewa Team`;
      await this.emailService.sendEmail(userEmail, subject, text);
    }

    return updated;
  }
}
