import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { LeaveRequestSetting } from 'src/modules/leave-request-setting/entities/leave-request-setting.entity';

@Entity('company')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column()
  is_active: boolean;

  @Column()
  created_by: number;

  @Column()
  updated_by: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 500 })
  location: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @OneToMany(() => LeaveRequestSetting, (leaveRequestSetting) => leaveRequestSetting.company)
  leaveRequestSettings: LeaveRequestSetting[];
}
