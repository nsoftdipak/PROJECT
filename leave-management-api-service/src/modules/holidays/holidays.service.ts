import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Holiday } from 'src/shared/entities/holiday.entity';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Location } from 'src/shared/entities/location.entity';

@Injectable()
export class HolidaysService {
  constructor(@InjectRepository(Holiday) private readonly holidayRepo:Repository<Holiday>,
@InjectRepository(User)private readonly userRepo:Repository<User>,
@InjectRepository(Location)private readonly locationRepo:Repository<Location>){}
  
async create(createHolidayDto: CreateHolidayDto): Promise<Holiday> {

  const holiday = new Holiday();
  // const { occasion, occasion_date, location ,is_optional, created_by} = createHolidayDto;

  // const user = await this.userRepo.findOne({ where: { id: created_by } });
  const locatio= await this.locationRepo.findOne({ where: { id: createHolidayDto.location } });

  // if (!user ) {
  //   throw new NotFoundException(`User with ID ${created_by} not found`);
  // }

  if (!locatio) {
    throw new NotFoundException(`Location with name ${locatio} not found`);
  }

  
  holiday.created_at=new Date();
  holiday.updated_at=new Date();
  holiday.created_by=createHolidayDto.created_by;
  holiday.updated_by=createHolidayDto.updated_by;
  holiday.is_optional=createHolidayDto.is_optional;
  holiday.occasion=createHolidayDto.occasion;
  holiday.location=locatio;
  holiday.occasion_date=createHolidayDto.occasion_date;

  

  return await this.holidayRepo.save(holiday);
}



async update(id: number, updateHolidayDto: UpdateHolidayDto): Promise<Holiday> {
  const holiday = await this.holidayRepo.findOne({ where: { id } });

  if (!holiday) {
    throw new NotFoundException(`Holiday with ID ${id} not found`);
  }

  if (updateHolidayDto.updated_by_id) {
    const user = await this.userRepo.findOne({ where: { id: updateHolidayDto.updated_by_id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${updateHolidayDto.updated_by_id} not found`);
    }
    holiday.updated_by = user;
  }

  if (updateHolidayDto.location_name) {
    const location = await this.locationRepo.findOne({ where: { name: updateHolidayDto.location_name } });
    if (!location) {
      throw new NotFoundException(`Location with name ${updateHolidayDto.location_name} not found`);
    }
    holiday.location = location;
  }

  Object.assign(holiday, updateHolidayDto);
  holiday.updated_at = new Date();

  return await this.holidayRepo.save(holiday);
}



  async findAll():Promise<Holiday[]> {
    
    return await this.holidayRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} holiday`;
  }

  // update(id: number, updateHolidayDto: UpdateHolidayDto) {
  //   return `This action updates a #${id} holiday`;
  // }

  remove(id: number) {
    return `This action removes a #${id} holiday`;
  }
}
