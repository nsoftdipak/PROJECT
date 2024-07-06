import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { CompanyLeave } from './company_leaf.entity'; // Corrected import name

@Entity('user_leaves')
export class UserLeave {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userLeaves, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => CompanyLeave, (companyLeave) => companyLeave.userLeaves)
  @JoinColumn({ name: 'company_leave' })
  company_leave: CompanyLeave;

  @Column({ nullable: true })
  half_day: boolean;

  @Column()
  from_date: Date;

  @Column()
  to_date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'assigned_to' })
  assigned_to: User;

  @Column({ length: 50 })
  status: string;

  @Column({ type: 'bit' })
  is_auto_approved: boolean;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @Column({ type: 'text', nullable: true })
  attachments: string;

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

  @Column({ type: 'text', nullable: true }) // New column for message
  message: string;
}
