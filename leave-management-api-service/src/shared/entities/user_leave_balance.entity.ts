import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { CompanyLeave } from './company_leaf.entity';
import { LeaveEncashment } from 'src/modules/leave-encashment/entities/leave-encashment.entity';

@Entity('user_leave_balance')
export class UserLeaveBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userLeaveBalances, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => CompanyLeave, (companyLeave) => companyLeave.userLeaveBalances)
  @JoinColumn({ name: 'company_leave' })
  company_leave: CompanyLeave;

  @Column({ type: 'float' , nullable:true})
  prorated_balance: number;

  @Column({ type: 'float' ,nullable:true})
  current_balance: number;

  @Column({ type: 'int', default: 0 }) // Assuming it to be an integer with a default value of 0
  compensatory_count: number;

  @OneToMany(() => LeaveEncashment, (leaveEncashment) => leaveEncashment.userLeaveBalance)
  leaveEncashments: LeaveEncashment[];
}
