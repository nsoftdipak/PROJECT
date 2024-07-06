import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationConfigService } from './notification_config.service';
import { CreateNotificationConfigDto } from './dto/create-notification_config.dto';
import { UpdateNotificationConfigDto } from './dto/update-notification_config.dto';

@Controller('notification-config')
export class NotificationConfigController {
  constructor(private readonly notificationConfigService: NotificationConfigService) {}

  @Post()
  create(@Body() createNotificationConfigDto: CreateNotificationConfigDto) {
    return this.notificationConfigService.create(createNotificationConfigDto);
  }


  // @Post()
  // create() {
  //   return this.notificationConfigService.create();
  // }

  @Get()
  findAll() {
    return this.notificationConfigService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationConfigService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNotificationConfigDto: UpdateNotificationConfigDto) {
    return this.notificationConfigService.update(+id, updateNotificationConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationConfigService.remove(+id);
  }
}











// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { NotificationConfigService } from './notification_config.service';
// import { CreateNotificationConfigDto } from './dto/create-notification_config.dto';
// import { UpdateNotificationConfigDto } from './dto/update-notification_config.dto';

// @Controller('notificationConfig')
// export class NotificationConfigController {
//   constructor(private readonly notificationConfigService: NotificationConfigService) {}

//   // @Post()
//   // create(@Body() createNotificationConfigDto: CreateNotificationConfigDto) {
//   //   return this.notificationConfigService.create(createNotificationConfigDto);
//   // }


//   @Post()
//   create(@Body() createNotificationConfigDto: CreateNotificationConfigDto) {
//     return this.notificationConfigService.create(createNotificationConfigDto);
//   }


//   @Get()
//   findAll() {
//     return this.notificationConfigService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.notificationConfigService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateNotificationConfigDto: UpdateNotificationConfigDto) {
//     return this.notificationConfigService.update(+id, updateNotificationConfigDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.notificationConfigService.remove(+id);
//   }
// }
