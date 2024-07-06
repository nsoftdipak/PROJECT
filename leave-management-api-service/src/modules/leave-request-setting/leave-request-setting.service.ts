// leave-request-setting.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveRequestSetting } from './entities/leave-request-setting.entity';
import { CreateLeaveRequestSettingDto } from './dto/create-leave-request-setting.dto';

@Injectable()
export class LeaveRequestSettingService {
  constructor(
    @InjectRepository(LeaveRequestSetting)
    private readonly leaveRequestSettingRepository: Repository<LeaveRequestSetting>,
  ) {}

  async createLeaveRequestSetting(createLeaveRequestSettingDto: CreateLeaveRequestSettingDto): Promise<LeaveRequestSetting> {
    const leaveRequestSetting = this.leaveRequestSettingRepository.create(createLeaveRequestSettingDto);
    return await this.leaveRequestSettingRepository.save(leaveRequestSetting);
  }

  async getLeaveRequestSetting(): Promise<LeaveRequestSetting[]> {
    return await this.leaveRequestSettingRepository.find();
  }
}













// leave-request-setting.service.ts

// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { LeaveRequestSetting } from './entities/leave-request-setting.entity';
// import { CreateLeaveRequestSettingDto } from './dto/create-leave-request-setting.dto';
// import { User } from 'src/shared/entities/user.entity';
// import { CompanyLeave } from 'src/shared/entities/company_leaf.entity';
// import { UserLeaveBalance } from 'src/shared/entities/user_leave_balance.entity';

// @Injectable()
// export class LeaveRequestSettingService {
//   constructor(
//     @InjectRepository(LeaveRequestSetting)
//     private readonly leaveRequestSettingRepository: Repository<LeaveRequestSetting>,
//     @InjectRepository(User)
//     private readonly userRepo: Repository<User>,
//     @InjectRepository(CompanyLeave)
//     private readonly companyLeaveRepo: Repository<CompanyLeave>,
//     @InjectRepository(UserLeaveBalance)
//     private readonly userLeaveBalanceRepo: Repository<UserLeaveBalance>,
//   ) {}

//   async createLeaveRequestSetting(createLeaveRequestSettingDto: CreateLeaveRequestSettingDto): Promise<LeaveRequestSetting> {
//     const leaveRequestSetting = this.leaveRequestSettingRepository.create(createLeaveRequestSettingDto);
//     return await this.leaveRequestSettingRepository.save(leaveRequestSetting);
//   }

//   async getLeaveRequestSetting(): Promise<LeaveRequestSetting[]> {
//     return await this.leaveRequestSettingRepository.find();
//   }

//   async checkLeavePolicy(checkLeavePolicyDto: any): Promise<{ isAllowed: boolean, message: string }> {
//     const { leaveTypeId, userId, totalLeaveDays, companyId } = checkLeavePolicyDto;

//     // Fetch the leave policy setting
//     const leavePolicySetting = await this.leaveRequestSettingRepository.findOne({
//       where: { leaveTypeId, companyId },
//     });

//     if (!leavePolicySetting) {
//       return { isAllowed: false, message: 'Leave policy setting not found for the specified leave type and company.' };
//     }

//     // Check if the application days range is correct
//     const currentDate = new Date();
//     let allowedStartDate = new Date(currentDate);

//     switch (leavePolicySetting.unit) {
//       case 'day':
//         allowedStartDate.setDate(currentDate.getDate() + leavePolicySetting.value);
//         break;
//       case 'month':
//         allowedStartDate.setMonth(currentDate.getMonth() + leavePolicySetting.value);
//         break;
//       case 'year':
//         allowedStartDate.setFullYear(currentDate.getFullYear() + leavePolicySetting.value);
//         break;
//       default:
//         return { isAllowed: false, message: 'Invalid unit in leave policy setting.' };
//     }

//     if (currentDate > allowedStartDate) {
//       return { isAllowed: false, message: `You can only apply for leave within the next ${leavePolicySetting.value} ${leavePolicySetting.unit}(s).` };
//     }

//     // Check user's leave balance
//     const companyLeave = await this.companyLeaveRepo.findOne({ where: { leave_type: leaveTypeId } });
//     if (!companyLeave) {
//       return { isAllowed: false, message: 'Company leave settings not found for this leave type.' };
//     }

//     const userLeaveBalance = await this.userLeaveBalanceRepo
//       .createQueryBuilder('userLeaveBalance')
//       .where('userLeaveBalance.user_Id = :userId', { userId })
//       .andWhere('userLeaveBalance.company_leave = :companyLeaveId', { companyLeaveId: companyLeave.id })
//       .getOne();

//     if (!userLeaveBalance) {
//       return { isAllowed: false, message: 'User leave balance not found.' };
//     }

//     if (userLeaveBalance.prorated_balance < totalLeaveDays || userLeaveBalance.current_balance < totalLeaveDays) {
//       return { isAllowed: false, message: 'Insufficient leave balance.' };
//     }

//     return { isAllowed: true, message: 'Leave policy satisfied.' };
//   }
// }
