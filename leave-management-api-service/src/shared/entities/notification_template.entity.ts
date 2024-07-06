import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { NotificationType } from './notification_type.entity';
import { User } from './user.entity';

@Entity('notification_templates')
export class NotificationTemplate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NotificationType, (type) => type.templates)
  @JoinColumn({ name: 'type' })
  type: NotificationType;

  @Column({ type: 'text' })
  content: string;

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
}
