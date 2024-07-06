import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserLeafDto } from './dto/create-user_leaf.dto';
import { UpdateUserLeafDto } from './dto/update-user_leaf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLeave } from 'src/shared/entities/user_leaf.entity';
import { Repository } from 'typeorm';
import { CompanyLeave } from 'src/shared/entities/company_leaf.entity';
import { User } from 'src/shared/entities/user.entity';
import { LeaveType } from 'src/shared/entities/leave-type.entity';
import { UserLeaveBalance } from 'src/shared/entities/user_leave_balance.entity';



@Injectable()
export class UserLeavesService {
  constructor(
    @InjectRepository(UserLeave)
    private readonly userLeaveRepository: Repository<UserLeave>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CompanyLeave)
    private readonly companyLeaveRepository: Repository<CompanyLeave>,
    @InjectRepository(LeaveType)
    private readonly leaveTypeRepository: Repository<LeaveType>,

    @InjectRepository(UserLeaveBalance)
    private readonly userLeaveBalance:Repository<UserLeaveBalance>
  ) {}

  async create(createUserLeafDto: CreateUserLeafDto): Promise<UserLeave> {
    console.log("Request received: Create User Leave", createUserLeafDto);
    
    // Find the user by ID
    const user = await this.userRepository.findOne({ where: { id: createUserLeafDto.userId } });
    if (!user) {
        console.error("User not found, ID:", createUserLeafDto.userId);
        throw new NotFoundException('User not found');
    }

    // Find the creator by ID
    const createdBy = await this.userRepository.findOne({ where: { id: createUserLeafDto.createdById } });
    if (!createdBy) {
        console.error("Creator not found, ID:", createUserLeafDto.createdById);
        throw new NotFoundException('Creator not found');
    }

    // Find the assigned user by ID
    const assignedTo = await this.userRepository.findOne({ where: { id: createUserLeafDto.assignedToId } });
    if (!assignedTo) {
        console.error("Assigned user not found, ID:", createUserLeafDto.assignedToId);
        throw new NotFoundException('Assigned user not found');
    }

    // Find the company leave by leave type ID
    const companyLeave = await this.companyLeaveRepository
        .createQueryBuilder('companyLeave')
        .leftJoinAndSelect('companyLeave.leave_type', 'leave_type')
        .where('leave_type.id = :leaveTypeId', { leaveTypeId: createUserLeafDto.leaveTypeId })
        .getOne();

    if (!companyLeave) {
        console.error("Company Leave not found, Leave Type ID:", createUserLeafDto.leaveTypeId);
        throw new NotFoundException('Company Leave not found');
    }

    // Create the user leave entity
    const userLeave = new UserLeave();
    userLeave.user = user;
    userLeave.company_leave = companyLeave;
    userLeave.half_day = createUserLeafDto.halfDay;
    userLeave.from_date = createUserLeafDto.fromDate;
    userLeave.to_date = createUserLeafDto.toDate;
    userLeave.assigned_to = assignedTo;
    userLeave.status = createUserLeafDto.status;
    userLeave.is_auto_approved = createUserLeafDto.isAutoApproved || false;
    userLeave.comments = createUserLeafDto.comments;
    userLeave.attachments = createUserLeafDto.attachments;
    userLeave.created_by = createdBy;
    userLeave.updated_by = createdBy;
    userLeave.created_at = new Date();
    userLeave.updated_at = new Date();

    console.log("User Leave entity created:", userLeave);

    // Save the user leave entity
    try {
        const savedUserLeave = await this.userLeaveRepository.save(userLeave);
        console.log("User Leave saved successfully:", savedUserLeave);
        return savedUserLeave;
    } catch (error) {
        console.error("Error saving User Leave:", error);
        throw new Error('Error saving User Leave');
    }
}


  async update(id: number, updateUserLeafDto: UpdateUserLeafDto): Promise<UserLeave> {
    const userLeave = await this.userLeaveRepository.findOne({ where: { id } });
    if (!userLeave) {
      throw new NotFoundException('User Leave not found');
    }

    const user = await this.userRepository.findOne({ where: { id: updateUserLeafDto.userId } });
    const companyLeave = await this.companyLeaveRepository.findOne({ where: { id: updateUserLeafDto.companyLeaveId } });

    if (!user || !companyLeave) {
      throw new NotFoundException('User or Company Leave not found');
    }

    userLeave.assigned_to = user;
    userLeave.attachments = updateUserLeafDto.attachments;
    userLeave.comments = updateUserLeafDto.comments;
    userLeave.company_leave = companyLeave;
    userLeave.from_date = updateUserLeafDto.fromDate;
    userLeave.half_day = updateUserLeafDto.halfDay;
    userLeave.is_auto_approved = updateUserLeafDto.isAutoApproved;
    userLeave.user = user;
    userLeave.to_date = updateUserLeafDto.toDate;
    userLeave.status = updateUserLeafDto.status;
    userLeave.updated_by = user;
    userLeave.updated_at = new Date();

    return await this.userLeaveRepository.save(userLeave);
  }

  async findTodaysApprovedLeaves(): Promise<any[]> {
    const today = new Date();
    const leaves = await this.userLeaveRepository
      .createQueryBuilder('userLeave')
      .leftJoinAndSelect('userLeave.user', 'user')
      .leftJoinAndSelect('userLeave.company_leave', 'companyLeave')
      .leftJoinAndSelect('companyLeave.leave_type', 'leaveType')
      .where('userLeave.status = :status', { status: 'Approved' })
      .andWhere('DATE(userLeave.from_date) = :today', { today: today.toISOString().slice(0, 10) })
      .getMany();

    const formattedLeaves = leaves.map(leave => ({
      userId: leave.user.id,
      userName: `${leave.user.first_name} ${leave.user.last_name}`,
      leaveType: leave.company_leave.leave_type.name,
    }));

    return formattedLeaves;
  }

  async findPendingLeaves(): Promise<any[]> {
    console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")
    const data = await this.userLeaveRepository
      .createQueryBuilder('userLeave')
      .leftJoinAndSelect('userLeave.user', 'user')
      .leftJoinAndSelect('userLeave.company_leave', 'company_leave')
      .leftJoinAndSelect('company_leave.leave_type', 'leave_type')
      .where('userLeave.status = :status', { status: 'Pending' })
      .getMany();

    const formattedData = data.map(item => ({
      id: item.id,
      user: {
        id: item.user.id,
        name: `${item.user.first_name} ${item.user.last_name}`,
        country_code: item.user.country_code,
      },
      from_date: item.from_date,
      to_date: item.to_date,
      leave_type: item.company_leave.leave_type.name,
    }));

    console.log(formattedData);
    return formattedData;
  }



  async findLeavesByStatus(status: string): Promise<any[]> {
    console.log("KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK")

    const data = await this.userLeaveRepository
      .createQueryBuilder('userLeave')
      .leftJoinAndSelect('userLeave.user', 'user')
      .leftJoinAndSelect('userLeave.company_leave', 'company_leave')
      .leftJoinAndSelect('company_leave.leave_type', 'leave_type')
      .where('userLeave.status = :status', { status })
      .getMany();

    const formattedData = data.map(item => ({
      id: item.id,
      user: {
        id: item.user.id,
        name: `${item.user.first_name} ${item.user.last_name}`,
        country_code: item.user.country_code,
      },
      from_date: item.from_date,
      to_date: item.to_date,
      leave_type: item.company_leave.leave_type.name,
      status:item.status,
    }));
    console.log(formattedData)


    return formattedData;
  }

  async findPendingAdminLeaves(status: string, managerId: number): Promise<any[]> {
    const data = await this.userLeaveRepository
      .createQueryBuilder('userLeave')
      .leftJoinAndSelect('userLeave.user', 'user')
      .leftJoinAndSelect('userLeave.company_leave', 'company_leave')
      .leftJoinAndSelect('company_leave.leave_type', 'leave_type')
      .where('userLeave.status = :status', { status })
      .andWhere('userLeave.assigned_to = :managerId', { managerId })
      .getMany();

    const formattedData = data.map(item => ({
      id: item.id,
      user: {
        id: item.user.id,
        name: `${item.user.first_name} ${item.user.last_name}`,
        country_code: item.user.country_code,
      },
      from_date: item.from_date,
      to_date: item.to_date,
      leave_type: item.company_leave.leave_type.name,
    }));

    return formattedData;
  }
  

  
  
  remove(id: number) {
    return `This action removes a #${id} userLeaf`;
  }

  // async updateLeaveStatus(id: number, status: string, message?: string): Promise<void> {
  //   const updateData: Partial<UserLeave> = { status };
  //   if (message !== undefined) {
  //     updateData.message = message;
  //   }

  //   console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")

  //   if(status!=='approved')
  //   {
  //     await this.userLeaveRepository.update(id, updateData);

  //   }else{



  //     const userLeave = await this.userLeaveRepository.findOne({ where: { id:id}});
  //     if (userLeave) {
  //       const companyLeave = await this.companyLeaveRepository.findOne({ where: { leave_type: { id: userLeave.id } } });


  //       if(companyLeave)
  //       {


  //         const data=await this.userLeaveBalance
  //         .createQueryBuilder('userleavebBalance')
  //         .where('userleavebBalance.company_leave= :company_leave', {company_leave:companyLeave.id })
  //         .andWhere('userleavebBalance.user=:user_id',{id} )
  //         .update()
        

  //     //     .where('userLeave.status = :status', { status })
  //     // .andWhere('userLeave.assigned_to = :managerId', { managerId })
  //       }
  //   }
  // }

  // }



  async updateLeaveStatus(id: number, status: string, message?: string): Promise<void> {
    const updateData: Partial<UserLeave> = { status };
    if (message !== undefined) {
      updateData.message = message;
    }

    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");

    if (status !== 'approved') {
      await this.userLeaveRepository.update(id, updateData);
    } else {
      const userLeave = await this.userLeaveRepository.findOne({ where: { id:id }});
      if (userLeave) {
        const companyLeave = await this.companyLeaveRepository.findOne({ where: { leave_type: { id: userLeave.id } } });

        if (companyLeave) {
          const existingRecord = await this.userLeaveBalance.findOne({
            where: {
              company_leave: companyLeave,
              user: userLeave.user,
            },
          });

          if (existingRecord) {
            // Update existing record
            existingRecord.prorated_balance += 1; // Example increment, adjust as needed
            await this.userLeaveBalance.save(existingRecord);
          } else {
            // Create new record
            const newRecord = this.userLeaveBalance.create({
              company_leave: companyLeave,
              user: userLeave.user,
              prorated_balance:companyLeave.yearly_leaves,
              current_balance: 0, // Example initial value, adjust as needed
              compensatory_count: 0, // Example initial value, adjust as needed
            });
            await this.userLeaveBalance.save(newRecord);
          }
        }
      }

      // Update the status after handling companyLeave
      await this.userLeaveRepository.update(id, updateData);
    }

  }

  async getUserLeave(userId: number): Promise<UserLeave[]> {
    return await this.userLeaveRepository
      .createQueryBuilder('userleave')
      .leftJoinAndSelect('userleave.user', 'user')
      .where('userleave.user_id = :userId', { userId })
      .getMany();
  }

  async findLeavesByStatusAndUser(status: string, userId: number): Promise<UserLeave[]> {
    return await this.userLeaveRepository.createQueryBuilder('userleave')
      .leftJoinAndSelect('userleave.user', 'user')
      .where('userleave.status = :status', { status })
      .andWhere('userleave.user.id = :userId', { userId })
      .getMany();
  }

}
