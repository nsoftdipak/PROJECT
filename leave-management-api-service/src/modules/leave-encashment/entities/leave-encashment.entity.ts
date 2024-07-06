// leave-encashment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/shared/entities/user.entity';
import { UserLeaveBalance } from 'src/shared/entities/user_leave_balance.entity';
@Entity()
export class LeaveEncashment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.leaveEncashments)
  user: User;

  @ManyToOne(() => UserLeaveBalance, (balance) => balance.leaveEncashments)
  userLeaveBalance: UserLeaveBalance;

  @Column({ type: 'int' })
  leaveDays: number;

//   @Column({ type: 'decimal' })
//   amount: number;

  @Column({ type: 'enum', enum: ['Pending', 'Done'], default: 'Pending' })
  status: 'Pending' | 'Done';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
