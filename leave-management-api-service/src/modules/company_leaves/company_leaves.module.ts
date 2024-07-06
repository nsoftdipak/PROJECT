import { Module } from '@nestjs/common';
import { CompanyLeavesService } from './company_leaves.service';
import { CompanyLeavesController } from './company_leaves.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyLeave } from 'src/shared/entities/company_leaf.entity';
import { User } from 'src/shared/entities/user.entity';
import { LeaveType } from 'src/shared/entities/leave-type.entity';
import { UsersModule } from '../users/users.module';
import { LeaveTypeModule } from '../leave-type/leave-type.module';

@Module({
  imports:[TypeOrmModule.forFeature([CompanyLeave, User, LeaveType]), UsersModule,LeaveTypeModule ],
  controllers: [CompanyLeavesController],
  providers: [CompanyLeavesService],
})
export class CompanyLeavesModule {}
