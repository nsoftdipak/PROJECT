import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationTemplatesService } from './notification_templates.service';
import { CreateNotificationTemplateDto } from './dto/create-notification_template.dto';
import { UpdateNotificationTemplateDto } from './dto/update-notification_template.dto';

@Controller('notification-templates')
export class NotificationTemplatesController {
  constructor(private readonly notificationTemplatesService: NotificationTemplatesService) {}

  @Post()
  create(@Body() createNotificationTemplateDto: CreateNotificationTemplateDto) {
    return this.notificationTemplatesService.create(createNotificationTemplateDto);
  }

  // @Post()
  // create() {
  //   return this.notificationTemplatesService.create();
  // }

  @Get()
  findAll() {
    return this.notificationTemplatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationTemplatesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationTemplateDto: UpdateNotificationTemplateDto) {
    return this.notificationTemplatesService.update(+id, updateNotificationTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationTemplatesService.remove(+id);
  }
}
