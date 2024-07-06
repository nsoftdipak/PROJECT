import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { HolidaysService } from './holidays.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { Holiday } from 'src/shared/entities/holiday.entity';

@Controller('holidays')
export class HolidaysController {
  constructor(private readonly holidaysService: HolidaysService) {}

  @Post()
  create(@Body() createHolidayDto: CreateHolidayDto) {
    console.log('Received DTO:', createHolidayDto);
    return this.holidaysService.create(createHolidayDto);
  }

  @Get()
  findAll() {
    console.log("Request come in holiday table");
    return this.holidaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.holidaysService.findOne(+id);
  }

  @Put(':id') // Ensure the ID parameter is in the route
  update(@Param('id') id: string, @Body() updateHolidayDto: UpdateHolidayDto) {
    console.log("edit holiday");
    return this.holidaysService.update(+id, updateHolidayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.holidaysService.remove(+id);
  }
}
