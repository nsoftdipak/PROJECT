// leave-request-setting.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { LeaveRequestSettingService } from './leave-request-setting.service';
import { LeaveRequestSetting } from './entities/leave-request-setting.entity';
import { CreateLeaveRequestSettingDto } from './dto/create-leave-request-setting.dto';

@Controller('leave-request-settings')
export class LeaveRequestSettingController {
  constructor(private readonly leaveRequestSettingService: LeaveRequestSettingService) {}

  @Get()
  async getLeaveRequestSetting(): Promise<LeaveRequestSetting[]> {
    return await this.leaveRequestSettingService.getLeaveRequestSetting();
  }

  @Post()
  async createLeaveRequestSetting(@Body() createLeaveRequestSettingDto: CreateLeaveRequestSettingDto): Promise<LeaveRequestSetting> {
    return await this.leaveRequestSettingService.createLeaveRequestSetting(createLeaveRequestSettingDto);
  }
}






// leave-request-setting.controller.ts
// import { Controller, Get, Post, Body } from '@nestjs/common';
// import { LeaveRequestSettingService } from './leave-request-setting.service';
// import { LeaveRequestSetting } from './entities/leave-request-setting.entity';
// import { CreateLeaveRequestSettingDto } from './dto/create-leave-request-setting.dto';

// @Controller('leave-request-settings')
// export class LeaveRequestSettingController {
//   constructor(private readonly leaveRequestSettingService: LeaveRequestSettingService) {}

//   @Get()
//   async getLeaveRequestSetting(): Promise<LeaveRequestSetting[]> {
//     return await this.leaveRequestSettingService.getLeaveRequestSetting();
//   }

//   @Post()
//   async createLeaveRequestSetting(@Body() createLeaveRequestSettingDto: CreateLeaveRequestSettingDto): Promise<LeaveRequestSetting> {
//     return await this.leaveRequestSettingService.createLeaveRequestSetting(createLeaveRequestSettingDto);
//   }


//   @Post('check-policy')
//   async checkLeavePolicy(@Body() checkLeavePolicyDto: any): Promise<{ isAllowed: boolean, message: string }> {
//     return await this.leaveRequestSettingService.checkLeavePolicy(checkLeavePolicyDto);
//   }
// }
