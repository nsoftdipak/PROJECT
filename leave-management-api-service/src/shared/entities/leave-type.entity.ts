import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { CompanyLeave } from './company_leaf.entity';
import { LeaveRequestSetting } from 'src/modules/leave-request-setting/entities/leave-request-setting.entity';

@Entity('leave_types')
export class LeaveType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 200, nullable: true })
  description: string;

  @Column()
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

  @OneToMany(() => CompanyLeave, (companyLeave) => companyLeave.leave_type, { cascade: true })
  companyLeaves: CompanyLeave[];

  @OneToMany(() => LeaveRequestSetting, (leaveRequestSetting) => leaveRequestSetting.leaveType)
  leaveRequestSettings: LeaveRequestSetting[];
}
