import { Module } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { HolidaysController } from './holidays.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Holiday } from 'src/shared/entities/holiday.entity';
import { User } from 'src/shared/entities/user.entity';
import { LocationsModule } from '../locations/locations.module';
import { UsersModule } from '../users/users.module';
import { Location } from 'src/shared/entities/location.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Holiday,User,Location]), LocationsModule, UsersModule],
  controllers: [HolidaysController],
  providers: [HolidaysService, ],
})
export class HolidaysModule {}
