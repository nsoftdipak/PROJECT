import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CompanyLeavesService } from './company_leaves.service';
import { CreateCompanyLeafDto } from './dto/create-company_leaf.dto';
import { UpdateCompanyLeafDto } from './dto/update-company_leaf.dto';

@Controller('company-leaves')
export class CompanyLeavesController {
  constructor(private readonly companyLeavesService: CompanyLeavesService) {}

  @Post()
  async create(@Body() createCompanyLeafDto: CreateCompanyLeafDto) {
    return await this.companyLeavesService.create(createCompanyLeafDto);
  }

  @Put(':id')
async update(
  @Param('id') id: number,
  @Body() updateCompanyLeafDto: UpdateCompanyLeafDto,
) {
  console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++hello")
  return await this.companyLeavesService.update(id, updateCompanyLeafDto);
}




  @Get()
  findAll() {
    return this.companyLeavesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyLeavesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompanyLeafDto: UpdateCompanyLeafDto) {
  //   return this.companyLeavesService.update(+id, updateCompanyLeafDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyLeavesService.remove(+id);
  }
}
