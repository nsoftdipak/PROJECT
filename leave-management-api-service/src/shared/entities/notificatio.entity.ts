import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { NotificationType } from './notification_type.entity';
import { User } from './user.entity';
import { NotificationTemplate } from './notification_template.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NotificationType, (type) => type.notifications)
  @JoinColumn({ name: 'type' })
  type: NotificationType;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => NotificationTemplate, (template) => template)
  @JoinColumn({ name: 'template' })
  template: NotificationTemplate;

  @Column({ type: 'text' })
  data: string;

  @Column({ type: 'bit' })
  is_read: boolean;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}


// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { NotificationType } from './notification_type.entity';
// import { User } from './user.entity';
// import { NotificationTemplate } from './notification_template.entity';

// @Entity('notifications')
// export class Notification {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => NotificationType, (type) => type.notifications, { eager: true })
//   @JoinColumn({ name: 'type' })
//   type: NotificationType;

//   @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE', eager: true })
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//   @ManyToOne(() => NotificationTemplate, (template) => template, { eager: true })
//   @JoinColumn({ name: 'template' })
//   template: NotificationTemplate;

//   @Column({ type: 'text' })
//   data: string;

//   @Column({ type: 'bit' })
//   is_read: boolean;

//   @Column({ type: 'timestamp' })
//   created_at: Date;

//   @Column({ type: 'timestamp' })
//   updated_at: Date;
// }
