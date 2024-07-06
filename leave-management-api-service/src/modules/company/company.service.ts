import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from 'src/shared/entities/company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyService {

  constructor(@InjectRepository(Company)private readonly companyRepo:Repository<Company>){}
  create(createCompanyDto: CreateCompanyDto) {
    return 'This action adds a new company';
  }

 async GetAllComapny():Promise<any[]> {
    return await this.companyRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
