
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationConfig } from 'src/shared/entities/notification_config.entity';
import { NotificationType } from 'src/shared/entities/notification_type.entity';
import { CreateNotificationConfigDto } from './dto/create-notification_config.dto';
import { UpdateNotificationConfigDto } from './dto/update-notification_config.dto';

@Injectable()
export class NotificationConfigService {

  constructor(
    @InjectRepository(NotificationConfig) private readonly notiConfigRepo: Repository<NotificationConfig>,
    @InjectRepository(NotificationType) private readonly notificationTypeRepo: Repository<NotificationType>,
  ) {}

  async create(createNotificationConfigDto: CreateNotificationConfigDto): Promise<NotificationConfig> {
    const { is_mail, is_push, notification_type_id } = createNotificationConfigDto;
    
    const notificationType = await this.notificationTypeRepo.findOne({ where: { id: notification_type_id } });
    if (!notificationType) {
      throw new NotFoundException(`NotificationType with ID ${notification_type_id} not found`);
    }

    const notificationConfig = new NotificationConfig();
    notificationConfig.is_mail = is_mail;
    notificationConfig.is_push = is_push;
    notificationConfig.type = notificationType; // Ensure this matches the entity

    return await this.notiConfigRepo.save(notificationConfig);
  }

  async findAll(): Promise<NotificationConfig[]> {
    return await this.notiConfigRepo.find({ relations: ['type'] });
  }

  async findOne(id: number): Promise<NotificationConfig> {
    const notificationConfig = await this.notiConfigRepo.findOne({ where: { id }, relations: ['type'] });
    if (!notificationConfig) {
      throw new NotFoundException(`NotificationConfig with ID ${id} not found`);
    }
    return notificationConfig;
  }

  async update(id: number, updateNotificationConfigDto: UpdateNotificationConfigDto): Promise<NotificationConfig> {
    const notificationConfig = await this.notiConfigRepo.findOne({ where: { id } });
    if (!notificationConfig) {
      throw new NotFoundException(`NotificationConfig with ID ${id} not found`);
    }

    const { notification_type_id, ...updateData } = updateNotificationConfigDto;

    if (notification_type_id) {
      const notificationType = await this.notificationTypeRepo.findOne({ where: { id: notification_type_id } });
      if (!notificationType) {
        throw new NotFoundException(`NotificationType with ID ${notification_type_id} not found`);
      }
      notificationConfig.type = notificationType;
    }

    Object.assign(notificationConfig, updateData);
    return await this.notiConfigRepo.save(notificationConfig);
  }

  async remove(id: number): Promise<void> {
    const notificationConfig = await this.notiConfigRepo.findOne({ where: { id } });
    if (!notificationConfig) {
      throw new NotFoundException(`NotificationConfig with ID ${id} not found`);
    }
    await this.notiConfigRepo.remove(notificationConfig);
  }
}
