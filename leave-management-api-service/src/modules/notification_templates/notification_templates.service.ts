import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationTemplateDto } from './dto/create-notification_template.dto';
import { UpdateNotificationTemplateDto } from './dto/update-notification_template.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationTemplate } from 'src/shared/entities/notification_template.entity';
import { Repository } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';
import { NotificationType } from 'src/shared/entities/notification_type.entity';

@Injectable()
export class NotificationTemplatesService {
  constructor(
    @InjectRepository(NotificationTemplate)
    private readonly notificationTemplateRepo: Repository<NotificationTemplate>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(NotificationType)
    private readonly notificationTypeRepo: Repository<NotificationType>,
  ) {}

  async create(createNotificationTemplateDto: CreateNotificationTemplateDto): Promise<NotificationTemplate> {
    try {
      const { type_id, content, is_active, created_by_id } = createNotificationTemplateDto;

      // Find the user who created the notification template
      const createdByUser = await this.userRepo.findOne({ where: { id: created_by_id } });
      if (!createdByUser) {
        throw new NotFoundException(`User with ID ${created_by_id} not found`);
      }

      // Find the notification type associated with the template
      const notificationType = await this.notificationTypeRepo.findOne({ where: { id: type_id } });
      if (!notificationType) {
        throw new NotFoundException(`NotificationType with ID ${type_id} not found`);
      }

      // Create a new NotificationTemplate instance and set its properties
      const notificationTemplate = new NotificationTemplate();
      notificationTemplate.type = notificationType;
      notificationTemplate.content = content;
      notificationTemplate.is_active = is_active;
      notificationTemplate.created_by = createdByUser;
      notificationTemplate.updated_by = createdByUser;
      notificationTemplate.created_at = new Date();
      notificationTemplate.updated_at = new Date();

      // Save the created NotificationTemplate and return it
      return await this.notificationTemplateRepo.save(notificationTemplate);
    } catch (error) {
      console.error('Error occurred during notification template creation:', error);
      throw error;
    }
  }

  async update(id: number, updateNotificationTemplateDto: UpdateNotificationTemplateDto): Promise<NotificationTemplate> {
    try {
      const notificationTemplate = await this.notificationTemplateRepo.findOne({ where: { id } });
      if (!notificationTemplate) {
        throw new NotFoundException(`NotificationTemplate with ID ${id} not found`);
      }

      // Update the NotificationTemplate object with the new data
      Object.assign(notificationTemplate, updateNotificationTemplateDto);
      notificationTemplate.updated_at = new Date();

      // Save and return the updated NotificationTemplate
      return await this.notificationTemplateRepo.save(notificationTemplate);
    } catch (error) {
      console.error(`Error occurred during updating notification template with ID ${id}:`, error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all notificationTemplates`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notificationTemplate`;
  }

  // update(id: number, updateNotificationTemplateDto: UpdateNotificationTemplateDto) {
  //   return `This action updates a #${id} notificationTemplate`;
  // }

  remove(id: number) {
    return `This action removes a #${id} notificationTemplate`;
  }
}
