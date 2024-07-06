import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from 'src/shared/entities/company.entity';
import { LeaveType } from 'src/shared/entities/leave-type.entity';

@Entity()
export class LeaveRequestSetting {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ type: 'varchar', length: 255 })
  // settingName: string;

  @Column({ type: 'int' })
  value: number;

  @Column({ type: 'varchar', length: 50 })
  unit: string; // e.g., 'days', 'months', 'years'

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => Company, (company) => company.leaveRequestSettings)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  companyId: number;

  @ManyToOne(() => LeaveType)
  @JoinColumn({ name: 'leaveTypeId' })
  leaveType: LeaveType;

  @Column()
  leaveTypeId: number;
}
