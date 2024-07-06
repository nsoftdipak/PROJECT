import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Location } from './location.entity';
import { UserRole } from './userrole.entity';
import { Holiday } from './holiday.entity';
import { CompanyLeave } from './company_leaf.entity';
import { UserLeaveBalance } from './user_leave_balance.entity';
import { UserLeave } from './user_leaf.entity';
import { Notification } from './notificatio.entity';
import { NotificationType } from './notification_type.entity';
import { NotificationTemplate } from './notification_template.entity';
import { Company } from './company.entity';
import { UserCompany } from './user_company.entity';
import { LeaveEncashment } from 'src/modules/leave-encashment/entities/leave-encashment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  first_name: string;

  @Column({ length: 200 })
  last_name: string;

  @Column({ length: 200, unique: true })
  email: string;

  @Column({ length: 10 })
  mobile_no: string;

  @Column({ length: 3 })
  country_code: string;

  @Column()
  is_active: boolean;

  @ManyToOne(() => Location, (location) => location.users)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @Column()
  date_of_joining: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({nullable: true})
  reporting_manager: number;

  @Column({ type: 'date', nullable: true })
  date_of_resignation: Date | null;

  @Column({ type: 'date', nullable: true })
  date_of_exit: Date | null;

  @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  userRoles: UserRole[];

  @OneToMany(() => Holiday, (holiday) => holiday.created_by)
  createdHolidays: Holiday[];

  @OneToMany(() => Holiday, (holiday) => holiday.updated_by)
  updatedHolidays: Holiday[];

  @OneToMany(() => CompanyLeave, (companyLeave) => companyLeave.created_by)
  createdCompanyLeaves: CompanyLeave[];

  @OneToMany(() => CompanyLeave, (companyLeave) => companyLeave.updated_by)
  updatedCompanyLeaves: CompanyLeave[];

  @OneToMany(() => UserLeaveBalance, (userLeaveBalance) => userLeaveBalance.user, { cascade: true })
  userLeaveBalances: UserLeaveBalance[];

  @OneToMany(() => UserLeave, (userLeave) => userLeave.user, { cascade: true })
  userLeaves: UserLeave[];

  @OneToMany(() => Notification, (notification) => notification.user, { cascade: true })
  notifications: Notification[];

  @OneToMany(() => NotificationType, (notificationType) => notificationType.created_by)
  createdNotificationTypes: NotificationType[];

  @OneToMany(() => NotificationType, (notificationType) => notificationType.updated_by)
  updatedNotificationTypes: NotificationType[];

  @OneToMany(() => NotificationTemplate, (notificationTemplate) => notificationTemplate.created_by)
  createdNotificationTemplates: NotificationTemplate[];

  @OneToMany(() => NotificationTemplate, (notificationTemplate) => notificationTemplate.updated_by)
  updatedNotificationTemplates: NotificationTemplate[];

  @ManyToOne(() => Company, (company) => company.users)
  @JoinColumn({ name: 'company' })
  company: Company;

  @OneToMany(() => UserCompany, (userCompany) => userCompany.user, { cascade: true })
  userCompanies: UserCompany[];

  @OneToMany(() => LeaveEncashment, (leaveEncashment) => leaveEncashment.user)
  leaveEncashments: LeaveEncashment[];
}
