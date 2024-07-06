import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateNotificatioDto } from './dto/create-notificatio.dto';
import { UpdateNotificatioDto } from './dto/update-notificatio.dto';
import { NotificatiosService } from './notificatios.service';

@Controller('notificatios')
export class NotificatiosController {
  constructor(private readonly notificatiosService: NotificatiosService) {}

  @Post()
  create(@Body()createcotificatioDto:CreateNotificatioDto) {
    return this.notificatiosService.create(createcotificatioDto);
  }

  @Get()
  findAll() {
    return this.notificatiosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificatiosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificatioDto: UpdateNotificatioDto) {
    return this.notificatiosService.update(+id, updateNotificatioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificatiosService.remove(+id);
  }
}
