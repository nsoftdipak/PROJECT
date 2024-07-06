import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationTypeDto } from './dto/create-notification_type.dto';
import { UpdateNotificationTypeDto } from './dto/update-notification_type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationType } from 'src/shared/entities/notification_type.entity';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';

@Injectable()
export class NotificationTypeService {

  constructor(
    @InjectRepository(NotificationType)
    private readonly notificationTypeRepo: Repository<NotificationType>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createNotificationTypeDto: CreateNotificationTypeDto) {
    try {
      const { name, description, is_active, created_by_id } = createNotificationTypeDto;

      // Find the user who created the notification type
      const createdByUser = await this.userRepo.findOne({ where: { id: created_by_id } });
      if (!createdByUser) {
        throw new NotFoundException(`User with ID ${created_by_id} not found`);
      }

      // Create a new NotificationType instance and set its properties
      const notificationType = new NotificationType();
      notificationType.name = name;
      notificationType.description = description;
      notificationType.is_active = is_active;
      notificationType.created_by = createdByUser;
      notificationType.updated_by = createdByUser;
      notificationType.created_at = new Date();
      notificationType.updated_at = new Date();

      // Save the created NotificationType and return it
      return await this.notificationTypeRepo.save(notificationType);
    } catch (error) {
      console.error('Error occurred during notification type creation:', error);
      throw error;
    }
  }

  async update(id: number, updateNotificationTypeDto: UpdateNotificationTypeDto) {
    try {
      const notificationType = await this.notificationTypeRepo.findOne({ where: { id } });
      if (!notificationType) {
        throw new NotFoundException(`NotificationType with ID ${id} not found`);
      }

      // Update the NotificationType object with the new data
      Object.assign(notificationType, updateNotificationTypeDto);
      notificationType.updated_at = new Date();

      // Save and return the updated NotificationType
      return await this.notificationTypeRepo.save(notificationType);
    } catch (error) {
      console.error(`Error occurred during updating notification type with ID ${id}:`, error);
      throw error;
    }
  }

  findAll() {
    return this.notificationTypeRepo.find();
  }

  // findOne(id: number) {
  //   return this.notificationTypeRepo.findOne();
  // }

  remove(id: number) {
    return this.notificationTypeRepo.delete(id);
  }
}
