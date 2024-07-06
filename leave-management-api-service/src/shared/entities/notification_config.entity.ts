import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { NotificationType } from './notification_type.entity';
import { User } from './user.entity';

@Entity('notification_config')
export class NotificationConfig {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NotificationType, (type) => type.configs)
  @JoinColumn({ name: 'type' })
  type: NotificationType;

  @Column({ type: 'bit' })
  is_mail: boolean;

  @Column({ type: 'bit' })
  is_push: boolean;
}



// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { NotificationType } from './notification_type.entity';

// @Entity('notification_config')
// export class NotificationConfig {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => NotificationType, (type) => type.configs, { eager: true })
//   @JoinColumn({ name: 'type' })
//   type: NotificationType;

//   @Column({ type: 'bit' })
//   is_mail: boolean;

//   @Column({ type: 'bit' })
//   is_push: boolean;
// }






// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// import { NotificationType } from './notification_type.entity';

// @Entity('notification_config')
// export class NotificationConfig {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => NotificationType, (type) => type.configs)
//   @JoinColumn({ name: 'type_id' }) // Adjusting to use 'type_id' as the foreign key column name
//   type: NotificationType;

//   @Column({ type: 'bit' })
//   is_mail: boolean;

//   @Column({ type: 'bit' })
//   is_push: boolean;
// }
