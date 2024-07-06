import { Module } from '@nestjs/common';
import { NotificationTemplatesService } from './notification_templates.service';
import { NotificationTemplatesController } from './notification_templates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationTemplate } from 'src/shared/entities/notification_template.entity';
import { User } from 'src/shared/entities/user.entity';
import { NotificationType } from 'src/shared/entities/notification_type.entity';
import { UsersModule } from '../users/users.module';
import { NotificationTypeModule } from '../notification_type/notification_type.module';

@Module({
  imports:[TypeOrmModule.forFeature([NotificationTemplate,User,NotificationType]), UsersModule,NotificationTypeModule],
  controllers: [NotificationTemplatesController],
  providers: [NotificationTemplatesService],
})
export class NotificationTemplatesModule {}
