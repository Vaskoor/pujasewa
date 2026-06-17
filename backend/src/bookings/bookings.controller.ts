import {
  Controller, Post, Get, Patch, Param, Body,
  Request, UseGuards, HttpCode,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingService) {}

  // POST /api/v1/bookings — public (guest can book, userId optional)
  @Public()
  @Post()
  create(@Body() dto: CreateBookingDto, @Request() req: any) {
    const userId = req?.user?.id ?? undefined;
    return this.bookingService.create(dto, userId);
  }

  // GET /api/v1/bookings/:id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  // POST /api/v1/bookings/:id/confirm-payment
  @Public()
  @Post(':id/confirm-payment')
  @HttpCode(200)
  confirmPayment(@Param('id') id: string) {
    return this.bookingService.confirmPayment(id);
  }

  // PATCH /api/v1/bookings/:id/cancel — pandit cancels
  @UseGuards(JwtAuthGuard)
  @Patch(':id/cancel')
  panditCancel(
    @Param('id') id: string,
    @Body('reason') reason: string,
    @Request() req: any,
  ) {
    return this.bookingService.panditCancel(id, req.user.panditProfile?.id, reason);
  }

  // GET /api/v1/bookings/pandit/mine — pandit sees own bookings
  @UseGuards(JwtAuthGuard)
  @Get('pandit/mine')
  panditBookings(@Request() req: any) {
    return this.bookingService.getPanditBookings(req.user.panditProfile?.id);
  }

  // GET /api/v1/bookings/user/mine — customer sees own bookings
  @UseGuards(JwtAuthGuard)
  @Get('user/mine')
  userBookings(@Request() req: any) {
    return this.bookingService.getUserBookings(req.user.id);
  }
}
