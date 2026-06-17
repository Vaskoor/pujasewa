import {
  Injectable, NotFoundException, BadRequestException, Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { NotificationService } from '../notifications/notification.service';
import { AvailabilityGateway } from '../gateways/availability.gateway';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationService,
    private readonly availabilityGateway: AvailabilityGateway,
  ) {}

  async create(dto: CreateBookingDto, userId?: string) {
    const panditId = dto.panditId
      ? await this.verifyPandit(dto.panditId, dto.date, dto.time)
      : await this.assignNearestPandit(dto.district, dto.date, dto.time, dto.caste, dto.religion);

    if (!panditId) {
      throw new BadRequestException(
        'No pandit available for this date/location. Please try a different date.',
      );
    }

    let totalAmount = 0;
    const pandit = await this.prisma.pandit.findUnique({ where: { id: panditId } });
    if (pandit) totalAmount += (pandit as any).baseRate ?? 2000;

    if (dto.packageId) {
      const pkg = await this.prisma.package.findUnique({ where: { id: dto.packageId } }).catch(() => null);
      if (pkg) totalAmount += (pkg as any).price ?? 0;
    }
    if (dto.decorationId) {
      const dec = await this.prisma.decoration.findUnique({ where: { id: dto.decorationId } }).catch(() => null);
      if (dec) totalAmount += (dec as any).price ?? 0;
    }

    if (!userId) {
      throw new BadRequestException('You must be logged in to make a booking.');
    }

    const booking = await this.prisma.booking.create({
      data: {
        customerName: dto.customerName,
        phone: dto.phone,
        altPhone: dto.altPhone,
        email: dto.email,
        address: dto.address,
        district: dto.district,
        caste: dto.caste,
        religion: dto.religion,
        duration: dto.duration ?? 120,
        eventDate: new Date(`${dto.date}T${dto.time}`),
        eventTime: dto.time,
        location: `${dto.address}, ${dto.district}`,
        totalAmount,
        status: 'PENDING',
        paymentStatus: 'UNPAID',
        pandit: { connect: { id: panditId } },
        customer: { connect: { id: userId } },
        eventType: { connect: { id: await this.getEventTypeId(dto.eventType) } },
        package: dto.packageId ? { connect: { id: dto.packageId } } : undefined,
        decoration: dto.decorationId ? { connect: { id: dto.decorationId } } : undefined,
      },
    });

    // Get pandit phone for SMS
    const panditUser = await this.prisma.user.findUnique({
      where: { id: (await this.prisma.pandit.findUnique({ where: { id: panditId } }))?.userId },
      select: { phone: true },
    });

    await this.notifications.notifyPandit(panditId, {
      bookingId: booking.id,
      eventType: dto.eventType,
      district: dto.district,
      address: dto.address,
      eventDate: booking.eventDate,
      duration: dto.duration ?? 120,
      panditPhone: panditUser?.phone || undefined,
    });

    this.logger.log(`Booking ${booking.id} created → pandit ${panditId}`);
    return booking;
  }

  private async getEventTypeId(eventTypeName: string): Promise<string> {
    const eventType = await this.prisma.eventType.findFirst({
      where: { name: eventTypeName },
    });
    if (!eventType) {
      throw new BadRequestException(`Event type "${eventTypeName}" not found.`);
    }
    return eventType.id;
  }

  private async assignNearestPandit(
    district: string,
    date: string,
    time: string,
    caste?: string,
    religion?: string,
  ): Promise<string | null> {
    const eventDate = new Date(`${date}T${time}`);

    const candidates = await this.prisma.pandit.findMany({
      where: {
        isApproved: true,
        ...(caste && { caste }),
        ...(religion && { religion }),
      },
      include: {
        user: { include: { profile: true } },
        bookings: {
          where: {
            eventDate: { gte: eventDate },
            status: { in: ['PENDING', 'CONFIRMED'] },
          },
        },
      },
      orderBy: { rating: 'desc' },
    });

    const sameDist = candidates.filter(
      p => p.user?.profile?.district === district && p.bookings.length === 0,
    );
    const others = candidates.filter(
      p => p.user?.profile?.district !== district && p.bookings.length === 0,
    );

    return sameDist[0]?.id ?? others[0]?.id ?? null;
  }

  private async verifyPandit(panditId: string, date: string, time: string) {
    const eventDate = new Date(`${date}T${time}`);
    const conflict = await this.prisma.booking.findFirst({
      where: {
        panditId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        eventDate,
      },
    });
    if (conflict) {
      return this.assignNearestPandit('', date, time);
    }
    return panditId;
  }

  async confirmPayment(bookingId: string) {
    const booking = await this.findOrFail(bookingId);
    const updated = await this.prisma.booking.update({
      where: { id: bookingId },
      data: { paymentStatus: 'FULL_PAID', status: 'CONFIRMED' },
    });

    const bookingWithEvent = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { eventType: true },
    });
    if (bookingWithEvent) {
      const panditUser = await this.prisma.user.findUnique({
        where: { id: (await this.prisma.pandit.findUnique({ where: { id: booking.panditId } }))?.userId },
        select: { phone: true },
      });
      await this.notifications.notifyPandit(booking.panditId, {
        bookingId: booking.id,
        eventType: bookingWithEvent.eventType.name,
        district: booking.district!,
        address: booking.address!,
        eventDate: booking.eventDate,
        duration: booking.duration,
        message: 'Payment confirmed. Please attend the ceremony.',
        panditPhone: panditUser?.phone || undefined,
      });
    }
    return updated;
  }

  async panditCancel(bookingId: string, panditId: string, reason: string) {
    const booking = await this.findOrFail(bookingId);
    if (booking.panditId !== panditId)
      throw new BadRequestException('Not your booking.');

    const daysLeft = (booking.eventDate.getTime() - Date.now()) / 86_400_000;
    if (daysLeft < 2)
      throw new BadRequestException(
        'Cancellations must be made at least 2 days before the event.',
      );

    await this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CANCELLED', cancellationReason: reason },
    });

    await this.emergencyReassign(bookingId, reason);
    return { message: 'Booking cancelled. Emergency pandit assigned.' };
  }

  async emergencyReassign(bookingId: string, cancelReason?: string) {
    const booking = await this.findOrFail(bookingId);
    const dateStr = booking.eventDate.toISOString().split('T')[0];
    const timeStr = booking.eventDate.toTimeString().slice(0, 5);

    const newPanditId = await this.assignNearestPandit(
      booking.district!, dateStr, timeStr,
    );

    if (!newPanditId) {
      this.logger.error(`EMERGENCY: No pandit available for booking ${bookingId}`);
      return;
    }

    await this.prisma.booking.update({
      where: { id: bookingId },
      data: { pandit: { connect: { id: newPanditId } }, status: 'CONFIRMED' },
    });

    const bookingWithEvent = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { eventType: true },
    });

    if (bookingWithEvent) {
      // Get new pandit phone number
      const newPanditUser = await this.prisma.user.findUnique({
        where: { id: (await this.prisma.pandit.findUnique({ where: { id: newPanditId } }))?.userId },
        select: { phone: true },
      });

      await this.notifications.notifyPandit(newPanditId, {
        bookingId: booking.id,
        eventType: bookingWithEvent.eventType.name,
        district: booking.district!,
        address: booking.address!,
        eventDate: booking.eventDate,
        duration: booking.duration,
        message: '🚨 EMERGENCY ASSIGNMENT — Please attend.',
        panditPhone: newPanditUser?.phone || undefined,
      });
    }

    // Emit socket event for real‑time UI update
    this.availabilityGateway.notifyAvailabilityUpdate(newPanditId);

    this.logger.log(`Emergency: booking ${bookingId} reassigned to pandit ${newPanditId}`);
  }

  async getPanditBookings(panditId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: { panditId },
      orderBy: { eventDate: 'asc' },
    });
    return bookings.map(b => this.stripPrivate(b));
  }

  async getUserBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { customerId: userId },
      include: {
        pandit: { include: { user: { include: { profile: true } } } },
      },
      orderBy: { eventDate: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.findOrFail(id);
  }

  private async findOrFail(id: string) {
    const b = await this.prisma.booking.findUnique({ where: { id } });
    if (!b) throw new NotFoundException('Booking not found.');
    return b;
  }

  private stripPrivate(booking: any) {
    const { phone, altPhone, email, customerName, ...safe } = booking;
    return safe;
  }
}
