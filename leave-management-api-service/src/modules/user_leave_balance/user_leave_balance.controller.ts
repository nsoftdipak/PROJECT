import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserLeaveBalanceService } from './user_leave_balance.service';
import { CreateUserLeaveBalanceDto } from './dto/create-user_leave_balance.dto';
import { UpdateUserLeaveBalanceDto } from './dto/update-user_leave_balance.dto';

@Controller('user-leave-balance')
export class UserLeaveBalanceController {
  constructor(private readonly userLeaveBalanceService: UserLeaveBalanceService) {}

  @Post()
  create(@Body() createUserLeaveBalanceDto: CreateUserLeaveBalanceDto) {
    return this.userLeaveBalanceService.create(createUserLeaveBalanceDto);
  }

  @Get()
  findAll() {
    console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
    return this.userLeaveBalanceService.findAll();
  }

  @Get(':userId')
  async getUserLeaveBalance(@Param('userId') userId: number) {
    console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
    const leaveBalance = await this.userLeaveBalanceService.getUserLeaveBalance(userId);
    if (!leaveBalance) {
      throw new NotFoundException('User leave balance not found');
    }
    return leaveBalance;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserLeaveBalanceDto: UpdateUserLeaveBalanceDto) {
    console.log(`Updating user leave balance with ID: ${id}`);
    console.log(`Received DTO: `, updateUserLeaveBalanceDto);

    const result = await this.userLeaveBalanceService.update(+id, updateUserLeaveBalanceDto);
    if (!result) {
      throw new NotFoundException(`UserLeaveBalance with ID ${id} not found`);
    }
    return result;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLeaveBalanceService.remove(+id);
  }
}
