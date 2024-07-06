import { Module } from '@nestjs/common';
import { UserrolesService } from './userroles.service';
import { UserrolesController } from './userroles.controller';
import { Role } from 'src/shared/entities/role.entity';
import { RolesService } from '../roles/roles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from 'src/shared/entities/userrole.entity';
import { UsersService } from '../users/users.service';
import { User } from 'src/shared/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports:[TypeOrmModule.forFeature([UserRole, Role, User]), UsersModule,RolesModule],
  controllers: [UserrolesController],
  providers: [UserrolesService, RolesService],
})
export class UserrolesModule {}
