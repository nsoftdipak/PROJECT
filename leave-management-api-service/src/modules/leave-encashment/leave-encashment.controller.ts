import { Controller, Get, Param } from '@nestjs/common';
import { LeaveEncashmentService } from './leave-encashment.service';
import { LeaveEncashment } from './entities/leave-encashment.entity';

@Controller('leave-encashments')
export class LeaveEncashmentController {
  constructor(private readonly leaveEncashmentService: LeaveEncashmentService) {}

  // @Get('user/:userId')
  // async getEncashmentByUserId(@Param('userId') userId: number): Promise<LeaveEncashment[]> {
  //   return this.leaveEncashmentService.calculateAndSaveEncashment(userId);
  // }
}
