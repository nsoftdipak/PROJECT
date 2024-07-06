import { Module } from '@nestjs/common';
import { LeaveTypeService } from './leave-type.service';
import { LeaveTypeController } from './leave-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveType } from 'src/shared/entities/leave-type.entity';
import { UsersModule } from '../users/users.module';
import { User } from 'src/shared/entities/user.entity';
import { CompanyLeave } from 'src/shared/entities/company_leaf.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LeaveType,User, CompanyLeave]), UsersModule],
  controllers: [LeaveTypeController],
  providers: [LeaveTypeService],
})
export class LeaveTypeModule {}
