import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Location } from 'src/shared/entities/location.entity';
import { LocationsModule } from '../locations/locations.module';
import { LocationsService } from '../locations/locations.service';
import { Company } from 'src/shared/entities/company.entity';
import { CompanyModule } from '../company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Location, Company]),
    LocationsModule, CompanyModule
  ],
  controllers: [UsersController],
  providers: [UsersService, LocationsService],
  exports: [UsersService],
})
export class UsersModule {}
