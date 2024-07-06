import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { NotificationTemplate } from './notification_template.entity';
import { NotificationConfig } from './notification_config.entity';
import { Notification } from './notificatio.entity';
@Entity('notification_types')
export class NotificationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 200, nullable: true })
  description: string;

  @Column({ type: 'bit' })
  is_active: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => NotificationTemplate, (template) => template.type, { cascade: true })
  templates: NotificationTemplate[];

  @OneToMany(() => NotificationConfig, (config) => config.type, { cascade: true })
  configs: NotificationConfig[];

  @OneToMany(() => Notification, (notification) => notification.type, { cascade: true })
  notifications: Notification[];
}
