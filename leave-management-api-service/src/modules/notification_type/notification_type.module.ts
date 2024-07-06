import { Module } from '@nestjs/common';
import { NotificationTypeService } from './notification_type.service';
import { NotificationTypeController } from './notification_type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationType } from 'src/shared/entities/notification_type.entity';
import { User } from 'src/shared/entities/user.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([User,NotificationType]), UsersModule],
  controllers: [NotificationTypeController],
  providers: [NotificationTypeService],
})
export class NotificationTypeModule {}
