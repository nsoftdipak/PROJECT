import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, Query, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

  Id:number;

  constructor(private readonly usersService: UsersService) {

  }



  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log("Received data on backend:", createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Get('data')
  async getUserByCompanyId(@Query('adminId') adminId: string) {
    const adminIdNumber = Number(adminId);
    if (isNaN(adminIdNumber)) {
      throw new BadRequestException('Invalid adminId');
    }

    console.log(`Admin ID: ${adminIdNumber}`);
    const data = await this.usersService.getUserByCompanyId(adminIdNumber);
    console.log(data);
    return data;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    console.log(typeof id);
    console.log("USER ID DATA--------------------------------------------------")
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id); // Should log 'number'
    return this.usersService.deleteUser(id);
  }

  @Get('role/admin')
  getAdminUsers(): Promise<{ id: number, first_name: string, last_name: string }[]> {
    return this.usersService.getAdminUsers();
  }
}
