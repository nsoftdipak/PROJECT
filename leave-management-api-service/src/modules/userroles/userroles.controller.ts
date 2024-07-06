import { Controller, Get, Post, Body, Patch, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { UserrolesService } from './userroles.service';
import { CreateUserroleDto } from './dto/create-userrole.dto';
import { UpdateUserroleDto } from './dto/update-userrole.dto';

@Controller('userroles')
export class UserrolesController {
  constructor(private readonly userrolesService: UserrolesService) {}

  @Post()
  async create(@Body() createUserroleDto: CreateUserroleDto) {
    return this.userrolesService.create(createUserroleDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserroleDto: UpdateUserroleDto,
  ) {
    return this.userrolesService.update(id, updateUserroleDto);
  }

  @Get()
  findAll() {
    return this.userrolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userrolesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserroleDto: UpdateUserroleDto) {
  //   return this.userrolesService.update(+id, updateUserroleDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userrolesService.remove(+id);
  }
}
