import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { TwoFactorGuard } from '../common/guards/twofa.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard, TwoFactorGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  stats() { return this.adminService.getStats(); }

  @Get('pending-payments')
  pendingPayments() { return this.adminService.getPendingPayments(); }

  @Post('confirm-payment/:bookingId')
  confirmPayment(@Param('bookingId') id: string) {
    return this.adminService.confirmPaymentAdmin(id);
  }

  // ---- Pandit approval endpoints ----
  @Get('pandits')
  getUnapprovedPandits() {
    return this.adminService.getUnapprovedPandits();
  }

  @Patch('pandits/:id/approve')
  approvePandit(
    @Param('id') id: string,
    @Body('approve') approve: boolean,
    @Body('adminNote') adminNote?: string,
  ) {
    return this.adminService.approvePandit(id, approve, adminNote);
  }
}
