
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from 'src/shared/entities/notificatio.entity';
import { CreateNotificationTypeDto } from '../notification_type/dto/create-notification_type.dto';
import { UpdateNotificationTypeDto } from '../notification_type/dto/update-notification_type.dto';
import { NotificationType } from 'src/shared/entities/notification_type.entity';
import { NotificationTemplate } from 'src/shared/entities/notification_template.entity';
import { User } from 'src/shared/entities/user.entity';

@Injectable()
export class NotificatiosService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
    @InjectRepository(NotificationType)
    private readonly notificationTypeRepo: Repository<NotificationType>,
    @InjectRepository(NotificationTemplate)
    private readonly notificationTemplateRepo: Repository<NotificationTemplate>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createNotificationDto): Promise<Notification> {
    try {
      const { type_id, user_id, template_id, data, is_read } = createNotificationDto;

      // Find the user for whom the notification is created
      const user = await this.userRepo.findOne({ where: { id: user_id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${user_id} not found`);
      }

      // Find the notification type
      const type = await this.notificationTypeRepo.findOne({ where: { id: type_id } });
      if (!type) {
        throw new NotFoundException(`NotificationType with ID ${type_id} not found`);
      }

      // Find the notification template
      const template = await this.notificationTemplateRepo.findOne({ where: { id: template_id } });
      if (!template) {
        throw new NotFoundException(`NotificationTemplate with ID ${template_id} not found`);
      }

      // Create a new Notification instance and set its properties
      const notification = new Notification();
      notification.type = type;
      notification.user = user;
      notification.template = template;
      notification.data = data;
      notification.is_read = is_read;
      notification.created_at = new Date();
      notification.updated_at = new Date();

      // Save the created Notification and return it
      return await this.notificationRepo.save(notification);
    } catch (error) {
      console.error('Error occurred during notification creation:', error);
      throw error;
    }
  }

  async update(id: number, updateNotificationDto): Promise<Notification> {
    try {
      const notification = await this.notificationRepo.findOne({ where: { id } });
      if (!notification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }

      // Update the Notification object with the new data
      Object.assign(notification, updateNotificationDto);
      notification.updated_at = new Date();

      // Save and return the updated Notification
      return await this.notificationRepo.save(notification);
    } catch (error) {
      console.error(`Error occurred during updating notification with ID ${id}:`, error);
      throw error;
    }
  }


  findAll() {
    return `This action returns all notificatios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificatio`;
  }

  // update(id: number, updateNotificatioDto: UpdateNotificatioDto) {
  //   return `This action updates a #${id} notificatio`;
  // }

  remove(id: number) {
    return `This action removes a #${id} notificatio`;
  }
}
