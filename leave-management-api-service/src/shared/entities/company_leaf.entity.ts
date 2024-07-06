import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { LeaveType } from './leave-type.entity';
import { User } from './user.entity';
import { UserLeaveBalance } from './user_leave_balance.entity';
import { UserLeave } from './user_leaf.entity';

@Entity('company_leaves')
export class CompanyLeave {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => LeaveType, (leaveType) => leaveType.companyLeaves)
  @JoinColumn({ name: 'leave_type' })
  leave_type: LeaveType;

  @Column()
  is_active: boolean;

  @Column({ type: 'int' })
  yearly_leaves: number;

  @Column({ type: 'int' })
  max_carry_forward: number;

  @Column()
  is_encashable: boolean;

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

  @OneToMany(() => UserLeaveBalance, (userLeaveBalance) => userLeaveBalance.company_leave, { cascade: true })
  userLeaveBalances: UserLeaveBalance[];

  @OneToMany(() => UserLeave, (userLeave) => userLeave.company_leave, { cascade: true })
  userLeaves: UserLeave[];
}














// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
// import { LeaveType } from './leave-type.entity';
// import { User } from './user.entity';
// import { UserLeaveBalance } from './user_leave_balance.entity';
// import { UserLeave } from './user_leaf.entity';

// @Entity('company_leaves')
// export class CompanyLeave {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @ManyToOne(() => LeaveType, (leaveType) => leaveType.companyLeaves, { eager: true })
//   @JoinColumn({ name: 'leave_type' })
//   leave_type: LeaveType;

//   @Column({ type: 'bit' })
//   is_active: boolean;

//   @Column({ type: 'int' })
//   yearly_leaves: number;

//   @Column({ type: 'int' })
//   max_carry_forward: number;

//   @Column()
//   is_encashable: boolean;

//   @ManyToOne(() => User, { eager: true })
//   @JoinColumn({ name: 'created_by' })
//   created_by: User;

//   @ManyToOne(() => User, { eager: true })
//   @JoinColumn({ name: 'updated_by' })
//   updated_by: User;

//   @Column({ type: 'timestamp' })
//   created_at: Date;

//   @Column({ type: 'timestamp' })
//   updated_at: Date;

//   @OneToMany(() => UserLeaveBalance, (userLeaveBalance) => userLeaveBalance.company_leave, { cascade: true })
//   userLeaveBalances: UserLeaveBalance[];

//   @OneToMany(() => UserLeave, (userLeave) => userLeave.company_leave, { cascade: true })
//   userLeaves: UserLeave[];
// }
