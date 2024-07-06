import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserLeaveBalanceDto } from './dto/create-user_leave_balance.dto';
import { UpdateUserLeaveBalanceDto } from './dto/update-user_leave_balance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLeaveBalance } from 'src/shared/entities/user_leave_balance.entity';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';
import { number } from 'joi';
import { CompanyLeave } from 'src/shared/entities/company_leaf.entity';
import { LeaveType } from 'src/shared/entities/leave-type.entity';

@Injectable()
export class UserLeaveBalanceService {

  constructor(@InjectRepository(UserLeaveBalance)private userLeaveBalanceRepo:Repository<UserLeaveBalance>,
  @InjectRepository(CompanyLeave)
  private readonly companyLeaveRepository: Repository<CompanyLeave>,
  @InjectRepository(LeaveType)
    private readonly leaveTypeRepository: Repository<LeaveType>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,){}



  create(createUserLeaveBalanceDto: CreateUserLeaveBalanceDto) {
    return 'This action adds a new userLeaveBalance';
  }

  async findAll() {
    return await this.userLeaveBalanceRepo.find({
      relations: [
        'user',
        'company_leave',
        'company_leave.leave_type',  // Add this relation to fetch leave type
      ],
    });
  }

  // async getUserLeaveBalance(userId: number): Promise<UserLeaveBalance[]> {
  //   return await this.userLeaveBalanceRepo
  //     .createQueryBuilder('userleavebalance')
  //     .leftJoinAndSelect('userleavebalance.user', 'user') // Assuming user is a related entity
  //     .leftJoinAndSelect('user.companyLeave', 'companyLeave') // Assuming companyLeave is another related entity
  //     .leftJoinAndSelect('companyLeave.leaveType', 'leaveType') // Assuming leaveType is another related entity
  //     // Add more leftJoinAndSelect statements as needed for additional related entities
  //     .where('userleavebalance.user_id = :userId', { userId })
  //     .getMany();
  // }



  async getUserLeaveBalance(userId: number): Promise<UserLeaveBalance[]> {
    return await this.userLeaveBalanceRepo
      .createQueryBuilder('userleavebalance')
      .leftJoinAndSelect('userleavebalance.user', 'user')
      .leftJoinAndSelect('userleavebalance.company_leave', 'company_leave')
      .leftJoinAndSelect('company_leave.leave_type', 'leave_type')
      .where('userleavebalance.user_id = :userId', { userId })
      .getMany();
  }

  // async update(id: number, updateUserLeaveBalanceDto: UpdateUserLeaveBalanceDto): Promise<UserLeaveBalance> {
  //   const { user_id, leave_type, compensatory_count, prorated_balance, current_balance } = updateUserLeaveBalanceDto;

  //   // Find the corresponding leave type entry
  //   const leaveType = await this.leaveTypeRepository.findOne({ where: { id: leave_type } });
  //   if (!leaveType) {
  //     console.error(`LeaveType with ID ${leave_type} not found`);
  //     throw new NotFoundException(`LeaveType with ID ${leave_type} not found`);
  //   }

  //   // Find the corresponding company leave entry
  //   const companyLeave = await this.companyLeaveRepository.findOne({ where: { leave_type: leaveType } });
  //   if (!companyLeave) {
  //     console.error(`CompanyLeave with leave_type ${leaveType.name} not found`);
  //     throw new NotFoundException(`CompanyLeave with leave_type ${leaveType.name} not found`);
  //   }

  //   // Check if user leave balance exists
  //   let userLeaveBalance = await this.userLeaveBalanceRepo.findOne({
  //     where: { user: { id: user_id } },
  //     relations: ['company_leave', 'user'],
  //   });

  //   if (userLeaveBalance) {
  //     // If the company leave is the same, update the existing user leave balance
  //     if (userLeaveBalance.company_leave.id === companyLeave.id) {
  //       userLeaveBalance.compensatory_count += compensatory_count;
  //       if (prorated_balance !== undefined) {
  //         userLeaveBalance.prorated_balance = prorated_balance;
  //       }
  //       if (current_balance !== undefined) {
  //         userLeaveBalance.current_balance = current_balance;
  //       }
  //     } else {
  //       // If the company leave is different, create a new user leave balance record
  //       userLeaveBalance = this.userLeaveBalanceRepo.create({
  //         user: { id: user_id },
  //         company_leave: companyLeave,
  //         prorated_balance,
  //         current_balance,
  //         compensatory_count,
  //       });
  //     }
  //   } else {
  //     // If the user leave balance does not exist, create a new record
  //     userLeaveBalance = this.userLeaveBalanceRepo.create({
  //       user: { id: user_id },
  //       company_leave: companyLeave,
  //       prorated_balance,
  //       current_balance,
  //       compensatory_count,
  //     });
  //   }

  //   // Log the userLeaveBalance object before saving
  //   console.log('Saving UserLeaveBalance:', userLeaveBalance);

  //   // Save the updated or new entry back to the database
  //   return await this.userLeaveBalanceRepo.save(userLeaveBalance);
  // }



  async update(id: number, updateUserLeaveBalanceDto: UpdateUserLeaveBalanceDto): Promise<UserLeaveBalance> {
    const { user_id, leave_type, compensatory_count, prorated_balance, current_balance } = updateUserLeaveBalanceDto;

    // Find the corresponding leave type entry
    const leaveType = await this.leaveTypeRepository.findOne({ where: { id: leave_type } });
    if (!leaveType) {
      console.error(`LeaveType with ID ${leave_type} not found`);
      throw new NotFoundException(`LeaveType with ID ${leave_type} not found`);
    }

    // Find the corresponding company leave entry
    const companyLeave = await this.companyLeaveRepository.findOne({ where: { leave_type: leaveType } });
    if (!companyLeave) {
      console.error(`CompanyLeave with leave_type ${leaveType.name} not found`);
      throw new NotFoundException(`CompanyLeave with leave_type ${leaveType.name} not found`);
    }

    // Check if user leave balance exists for the specified user and company leave
    let userLeaveBalance = await this.userLeaveBalanceRepo.findOne({
      where: { user: { id: user_id }, company_leave: { id: companyLeave.id } },
      relations: ['company_leave', 'user'],
    });

    if (userLeaveBalance) {
      // If the company leave is the same, update only the compensatory_count
      userLeaveBalance.compensatory_count += compensatory_count;
    } else {
      // If the user leave balance does not exist, create a new record
      userLeaveBalance = this.userLeaveBalanceRepo.create({
        user: { id: user_id },
        company_leave: companyLeave,
        prorated_balance,
        current_balance,
        compensatory_count,
      });
    }

    // Log the userLeaveBalance object before saving
    console.log('Saving UserLeaveBalance:', userLeaveBalance);

    // Save the updated or new entry back to the database
    return await this.userLeaveBalanceRepo.save(userLeaveBalance);
  }


  remove(id: number) {
    return `This action removes a #${id} userLeaveBalance`;
  }
}
