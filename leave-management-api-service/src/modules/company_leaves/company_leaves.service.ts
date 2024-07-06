import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyLeafDto } from './dto/create-company_leaf.dto';
import { UpdateCompanyLeafDto } from './dto/update-company_leaf.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyLeave } from 'src/shared/entities/company_leaf.entity';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';
import { LeaveType } from 'src/shared/entities/leave-type.entity';

@Injectable()
export class CompanyLeavesService {

  constructor(@InjectRepository(CompanyLeave) private readonly cRepo:Repository<CompanyLeave>,
@InjectRepository(User)private readonly userRepo:Repository<User>,
@InjectRepository(LeaveType)private readonly leaveTypeRepo:Repository<LeaveType>
){}


async create(createCompanyLeafDto: CreateCompanyLeafDto): Promise<CompanyLeave> {
  const user = await this.userRepo.findOne({ where: { id: createCompanyLeafDto.userId } });
  const leaveType = await this.leaveTypeRepo.findOne({ where: { name: createCompanyLeafDto.leaveTypeName } });

  if (!user) {
    throw new NotFoundException(`User with ID ${createCompanyLeafDto.userId} not found`);
  }

  if (!leaveType) {
    throw new NotFoundException(`LeaveType with name ${createCompanyLeafDto.leaveTypeName} not found`);
  }

  const cleave = new CompanyLeave();
  cleave.created_by = user;
  cleave.updated_by = user;
  cleave.is_active = createCompanyLeafDto.is_active;
  cleave.max_carry_forward = createCompanyLeafDto.max_carry_forward;
  cleave.yearly_leaves = createCompanyLeafDto.yearly_leaves;
  cleave.updated_at = new Date();
  cleave.created_at = new Date();
  cleave.is_encashable = createCompanyLeafDto.is_encashable;
  cleave.userLeaves = []; // Initialize with an empty array or relevant data
  cleave.userLeaveBalances = []; // Initialize with an empty array or relevant data
  cleave.leave_type = leaveType;

  return await this.cRepo.save(cleave);
}



async update(id: number, updateCompanyLeafDto: UpdateCompanyLeafDto): Promise<CompanyLeave> {
  const cleave = await this.cRepo.findOne({ where: { id } });
  if (!cleave) {
    throw new NotFoundException('Company Leave not found');
  }

  const user = await this.userRepo.findOne({ where: { id: updateCompanyLeafDto.userId } });
  const leaveType = await this.leaveTypeRepo.findOne({ where: { name: updateCompanyLeafDto.leaveTypeName } });

  if (!user) {
    throw new NotFoundException(`User with ID ${updateCompanyLeafDto.userId} not found`);
  }

  if (!leaveType) {
    throw new NotFoundException(`LeaveType with name ${updateCompanyLeafDto.leaveTypeName} not found`);
  }

  cleave.updated_by = user;
  cleave.is_active = updateCompanyLeafDto.is_active;
  cleave.max_carry_forward = updateCompanyLeafDto.max_carry_forward;
  cleave.yearly_leaves = updateCompanyLeafDto.yearly_leaves;
  cleave.updated_at = new Date();
  cleave.is_encashable = updateCompanyLeafDto.is_encashable;
  cleave.leave_type = leaveType;

  return await this.cRepo.save(cleave);
}


async findAll() {
  return this.cRepo.find({ relations: ['leave_type'] });
}

  findOne(id: number) {
    return `This action returns a #${id} companyLeaf`;
  }

  // update(id: number, updateCompanyLeafDto: UpdateCompanyLeafDto) {
  //   return `This action updates a #${id} companyLeaf`;
  // }

  remove(id: number) {
    return `This action removes a #${id} companyLeaf`;
  }
}
