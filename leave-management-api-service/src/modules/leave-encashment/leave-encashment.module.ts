import { Module } from '@nestjs/common';
import { LeaveEncashmentService } from './leave-encashment.service';
import { LeaveEncashmentController } from './leave-encashment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveEncashment } from './entities/leave-encashment.entity';
import { User } from 'src/shared/entities/user.entity';
import { LeaveType } from 'src/shared/entities/leave-type.entity';
import { CompanyLeave } from 'src/shared/entities/company_leaf.entity';
import { UsersModule } from '../users/users.module';
import { LeaveTypeModule } from '../leave-type/leave-type.module';
import { CompanyModule } from '../company/company.module';
import { UserLeave } from 'src/shared/entities/user_leaf.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LeaveEncashment, User,UserLeave, LeaveType,CompanyLeave]),User, UserLeave, LeaveTypeModule, CompanyModule],
  controllers: [LeaveEncashmentController],
  providers: [LeaveEncashmentService],
})
export class LeaveEncashmentModule {}
