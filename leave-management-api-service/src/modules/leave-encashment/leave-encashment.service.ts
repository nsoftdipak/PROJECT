import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserLeaveBalance } from 'src/shared/entities/user_leave_balance.entity';
import { CompanyLeave } from 'src/shared/entities/company_leaf.entity';
import { LeaveEncashment } from './entities/leave-encashment.entity';
import { User } from 'src/shared/entities/user.entity';
import { LeaveType } from 'src/shared/entities/leave-type.entity';
import { Company } from 'src/shared/entities/company.entity';

@Injectable()
export class LeaveEncashmentService {
  // constructor(
  //   @InjectRepository(UserLeaveBalance)
  //   private readonly userLeaveBalanceRepository: Repository<UserLeaveBalance>,
  //   @InjectRepository(CompanyLeave)
  //   private readonly companyLeaveRepository: Repository<CompanyLeave>,
  //   @InjectRepository(LeaveEncashment)
  //   private readonly leaveEncashmentRepository: Repository<LeaveEncashment>,
  //   @InjectRepository(User)
  //   private readonly userRepository: Repository<User>,
  //   @InjectRepository(LeaveType)
  //   private readonly leaveTypeRepository: Repository<LeaveType>,
  // ) {}

  // async calculateAndSaveEncashment(userId: number): Promise<LeaveEncashment[]> {
  //   const userLeaveBalances = await this.userLeaveBalanceRepository.find({
  //     where: { user: { id: userId } },
  //     relations: ['company_leave', 'company_leave.leave_type', 'company_leave.company'],
  //   });

  //   if (!userLeaveBalances.length) {
  //     throw new NotFoundException('No leave balances found for the user');
  //   }

  //   const encashments = [];

  //   for (const balance of userLeaveBalances) {
  //     const companyLeave = balance.company_leave;
  //     const leaveType = companyLeave.leave_type;

  //     if (companyLeave.is_encashable) {
  //       let encashment = await this.leaveEncashmentRepository.findOne({
  //         where: {
  //           user: { id: userId },
  //           leaveType: { id: leaveType.id },
  //           company: { id: companyLeave.company.id },
  //         },
  //       });

  //       if (encashment) {
  //         encashment.days += balance.current_balance;
  //       } else {
  //         encashment = new LeaveEncashment();
  //         encashment.user = { id: userId } as User;
  //         encashment.leaveType = { id: leaveType.id } as LeaveType;
  //         encashment.company = { id: companyLeave.company.id } as Company;
  //         encashment.leaveDays = balance.current_balance;
  //         encashment.status = 'Pending';
  //       }

  //       encashments.push(encashment);
  //     }
  //   }

  //   return await this.leaveEncashmentRepository.save(encashments);
  // }
}
