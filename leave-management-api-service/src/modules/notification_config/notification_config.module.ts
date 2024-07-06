import { Module } from '@nestjs/common';
import { NotificationConfigService } from './notification_config.service';
import { NotificationConfigController } from './notification_config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationConfig } from 'src/shared/entities/notification_config.entity';
import { NotificationTypeModule } from '../notification_type/notification_type.module';
import { NotificationType } from 'src/shared/entities/notification_type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([NotificationConfig,NotificationType]),NotificationTypeModule],
  controllers: [NotificationConfigController],
  providers: [NotificationConfigService],
})
export class NotificationConfigModule {}
