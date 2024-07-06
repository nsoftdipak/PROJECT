import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeaveTypeService } from './leave-type.service';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';

@Controller('leave')
export class LeaveTypeController {
  constructor(private readonly leaveTypeService: LeaveTypeService) {}

  @Post()
  create(@Body() createLeaveTypeDto: CreateLeaveTypeDto) {

    console.log(createLeaveTypeDto)
    return this.leaveTypeService.createNewLeave(createLeaveTypeDto);
  }
  @Get()
  findAll() {
    return this.leaveTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leaveTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveTypeDto: UpdateLeaveTypeDto) {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++")
    return this.leaveTypeService.update(+id, updateLeaveTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leaveTypeService.remove(+id);
  }
}
