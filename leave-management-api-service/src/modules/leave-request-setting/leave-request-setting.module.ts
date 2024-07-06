import { Module } from '@nestjs/common';
import { LeaveRequestSettingService } from './leave-request-setting.service';
import { LeaveRequestSettingController } from './leave-request-setting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveRequestSetting } from './entities/leave-request-setting.entity';
import { User } from 'src/shared/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UserLeaveBalance } from 'src/shared/entities/user_leave_balance.entity';
import { CompanyLeave } from 'src/shared/entities/company_leaf.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LeaveRequestSetting, User, UserLeaveBalance, CompanyLeave]),UsersModule],
  controllers: [LeaveRequestSettingController],
  providers: [LeaveRequestSettingService],
})
export class LeaveRequestSettingModule {}
