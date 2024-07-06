import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationTypeService } from './notification_type.service';
import { CreateNotificationTypeDto } from './dto/create-notification_type.dto';
import { UpdateNotificationTypeDto } from './dto/update-notification_type.dto';

@Controller('notification-type')
export class NotificationTypeController {
  constructor(private readonly notificationTypeService: NotificationTypeService) {}

  @Post()
  create(@Body()createNotificationTypeDto:CreateNotificationTypeDto) {
    return this.notificationTypeService.create(createNotificationTypeDto);
  }

  @Get()
  findAll() {
    return this.notificationTypeService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.notificationTypeService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationTypeDto: UpdateNotificationTypeDto) {
    return this.notificationTypeService.update(+id, updateNotificationTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationTypeService.remove(+id);
  }
}
