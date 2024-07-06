import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from 'src/shared/entities/location.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';

@Injectable()
export class LocationsService {

  constructor(@InjectRepository(Location) private readonly locationRepo:Repository<Location>){}
  async create(createLocationDto: CreateLocationDto): Promise<Location> {
    const location = this.locationRepo.create(createLocationDto);
    return await this.locationRepo.save(location);
  }

  async update(id: number, updateLocationDto: UpdateLocationDto): Promise<Location> {
    const location = await this.locationRepo.findOne({ where: { id } });
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    Object.assign(location, updateLocationDto);
    return await this.locationRepo.save(location);
  }

  async findAll(): Promise<Location[]> {
    return this.locationRepo.find();
  }

 async findOne(name: string):Promise<any> {

     let data= await this.locationRepo.findOne({where:{name}})
     return data.id;

  }

  

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
