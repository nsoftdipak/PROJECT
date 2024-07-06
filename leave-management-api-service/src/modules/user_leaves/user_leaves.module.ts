import { Module } from '@nestjs/common';
import { UserLeavesService } from './user_leaves.service';
import { UserLeavesController } from './user_leaves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { CompanyLeave } from 'src/shared/entities/company_leaf.entity';
import { UserLeave } from 'src/shared/entities/user_leaf.entity';
import { UsersModule } from '../users/users.module';
import { CompanyLeavesModule } from '../company_leaves/company_leaves.module';
import { LeaveType } from 'src/shared/entities/leave-type.entity';
import { UserLeaveBalance } from 'src/shared/entities/user_leave_balance.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User, CompanyLeave, UserLeave,LeaveType, UserLeaveBalance]), UsersModule, CompanyLeavesModule],
  controllers: [UserLeavesController],
  providers: [UserLeavesService],
})
export class UserLeavesModule {}
