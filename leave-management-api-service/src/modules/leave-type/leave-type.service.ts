import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveType } from 'src/shared/entities/leave-type.entity';
import { User } from 'src/shared/entities/user.entity';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { CompanyLeave } from 'src/shared/entities/company_leaf.entity';

@Injectable()
export class LeaveTypeService {

  constructor(
    @InjectRepository(LeaveType) private readonly leaveTypeRepo: Repository<LeaveType>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(CompanyLeave) private readonly companyLeaveRepo: Repository<CompanyLeave>,
  ) {}

  async createNewLeave(createLeaveTypeDto: CreateLeaveTypeDto): Promise<LeaveType> {
    const { name, description, is_active, created_by, updated_by, max_carry_forward, yearly_leaves, is_encashable } = createLeaveTypeDto;

    if (yearly_leaves < max_carry_forward) {
      throw new BadRequestException("Required max_carry_forward is less than yearly_leaves");
    }

    const leaveType = new LeaveType();
    leaveType.name = name;
    leaveType.description = description;
    leaveType.is_active = is_active;
    leaveType.created_by = created_by;
    leaveType.updated_by = updated_by;
    leaveType.created_at = new Date();
    leaveType.updated_at = new Date();

    const savedLeaveType = await this.leaveTypeRepo.save(leaveType);

    const companyLeave = new CompanyLeave();
    companyLeave.leave_type = savedLeaveType;
    companyLeave.is_active = is_active;
    companyLeave.yearly_leaves = yearly_leaves;
    companyLeave.max_carry_forward = max_carry_forward;
    companyLeave.created_by = created_by;
    companyLeave.updated_by = updated_by;
    companyLeave.created_at = new Date();
    companyLeave.updated_at = new Date();
    companyLeave.is_encashable = is_encashable;

    await this.companyLeaveRepo.save(companyLeave);

    return savedLeaveType;
  }

  async update(id: number, updateLeaveTypeDto: UpdateLeaveTypeDto): Promise<LeaveType> {
    // Find the LeaveType instance to update
    const leaveType = await this.leaveTypeRepo.findOne({ where: { id } });
    if (!leaveType) {
      throw new NotFoundException(`LeaveType with ID ${id} not found`);
    }

    const { max_carry_forward, yearly_leaves } = updateLeaveTypeDto;

    if (yearly_leaves < max_carry_forward) {
      throw new BadRequestException("Required max_carry_forward is less than yearly_leaves");
    }

    // Update the leaveType object with the new data
    Object.assign(leaveType, updateLeaveTypeDto);
    leaveType.updated_at = new Date();

    // Save the updated LeaveType
    const updatedLeaveType = await this.leaveTypeRepo.save(leaveType);

    // Find the associated CompanyLeave instance to update
    const companyLeave = await this.companyLeaveRepo.findOne({ where: { leave_type: leaveType } });
    if (companyLeave) {
      Object.assign(companyLeave, {
        is_active: updateLeaveTypeDto.is_active,
        yearly_leaves: updateLeaveTypeDto.yearly_leaves,
        max_carry_forward: updateLeaveTypeDto.max_carry_forward,
        updated_by: updateLeaveTypeDto.updated_by,
        updated_at: new Date(),
        is_encashable: updateLeaveTypeDto.is_encashable,
      });

      await this.companyLeaveRepo.save(companyLeave);
    }

    return updatedLeaveType;
  }


  // async update(id: number, updateLeaveTypeDto: UpdateLeaveTypeDto): Promise<LeaveType> {
  //   // Find the LeaveType instance to update
  //   const leaveType = await this.leaveTypeRepo.findOne({ where: { id } });
  //   if (!leaveType) {
  //     throw new NotFoundException(`LeaveType with ID ${id} not found`);
  //   }

  //   // Update the LeaveType object with the new data
  //   leaveType.name = updateLeaveTypeDto.leave_type.name;
  //   leaveType.description = updateLeaveTypeDto.leave_type.description;
  //   leaveType.is_active = updateLeaveTypeDto.is_active;
  //   leaveType.updated_by = updateLeaveTypeDto.updated_by;
  //   leaveType.updated_at = new Date();

  //   const updatedLeaveType = await this.leaveTypeRepo.save(leaveType);

  //   // Update the corresponding CompanyLeave entity
  //   const companyLeave = await this.companyLeaveRepo.findOne({ where: { leave_type: { id } } });
  //   if (companyLeave) {
  //     companyLeave.yearly_leaves = updateLeaveTypeDto.yearly_leaves;
  //     companyLeave.max_carry_forward = updateLeaveTypeDto.max_carry_forward;
  //     companyLeave.is_encashable = updateLeaveTypeDto.is_encashable;
  //     companyLeave.is_active = updateLeaveTypeDto.is_active;
  //     companyLeave.updated_by = updateLeaveTypeDto.updated_by;
  //     companyLeave.updated_at = new Date();

  //     await this.companyLeaveRepo.save(companyLeave);
  //   }

  //   return updatedLeaveType;
  // }

  async findAll(): Promise<Partial<LeaveType>[]> {
    return await this.leaveTypeRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} leaveType`;
  }

  remove(id: number) {
    return `This action removes a #${id} leaveType`;
  }
}
