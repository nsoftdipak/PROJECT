import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './modules/health/health.module';
import { routes } from './route';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { UserrolesModule } from './modules/userroles/userroles.module';
import { LocationsModule } from './modules/locations/locations.module';
import { RolesModule } from './modules/roles/roles.module';
import { UserLeavesModule } from './modules/user_leaves/user_leaves.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './shared/entities/role.entity';
import { UserRole } from './shared/entities/userrole.entity';
import { Holiday } from './shared/entities/holiday.entity';
import { CompanyLeave } from './shared/entities/company_leaf.entity';
import { LeaveType } from './shared/entities/leave-type.entity';
import { Location } from './shared/entities/location.entity';
import { Notification } from './shared/entities/notificatio.entity';
import { NotificationConfig } from './shared/entities/notification_config.entity';
import { NotificationTemplate } from './shared/entities/notification_template.entity';
import { NotificationType } from './shared/entities/notification_type.entity';
import { User } from './shared/entities/user.entity';
import { UserLeave } from './shared/entities/user_leaf.entity';
import { UserLeaveBalance } from './shared/entities/user_leave_balance.entity';
import { HolidaysModule } from './modules/holidays/holidays.module';
import { LeaveTypeModule } from './modules/leave-type/leave-type.module';
import { CompanyLeavesModule } from './modules/company_leaves/company_leaves.module';
import { NotificationTypeModule } from './modules/notification_type/notification_type.module';
import { NotificationConfigModule } from './modules/notification_config/notification_config.module';
import { NotificationTemplatesModule } from './modules/notification_templates/notification_templates.module';
import { AuthModule } from './modules/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { AuthMiddleware } from './auth/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { CompanyModule } from './modules/company/company.module';
import { Company } from './shared/entities/company.entity';
import { UserCompanyModule } from './modules/user_company/user_company.module';
import { UserCompany } from './shared/entities/user_company.entity';
import { UserLeaveBalanceModule } from './modules/user_leave_balance/user_leave_balance.module';
import { LeaveRequestSettingModule } from './modules/leave-request-setting/leave-request-setting.module';
import { LeaveRequestSetting } from './modules/leave-request-setting/entities/leave-request-setting.entity';
import { LeaveEncashmentModule } from './modules/leave-encashment/leave-encashment.module';
import { LeaveEncashment } from './modules/leave-encashment/entities/leave-encashment.entity';

@Module({
  imports: [UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ttlms',
      entities: [Role, UserRole, Holiday, CompanyLeave, LeaveType,Location,Notification,
        NotificationConfig,NotificationTemplate,NotificationType, User,UserLeave, UserLeaveBalance, Company, UserCompany,
        LeaveRequestSetting, LeaveEncashment],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Role, UserRole, Holiday, CompanyLeave, LeaveType,Location,Notification,
      NotificationConfig,NotificationTemplate,NotificationType, User,UserLeave, UserLeaveBalance, Company,UserCompany, 
    LeaveRequestSetting, LeaveEncashment]),

      ConfigModule.forRoot({
        isGlobal: true,
      }),
   
    AuthModule,
    HolidaysModule,
    CompanyLeavesModule,
    NotificationTypeModule,
    NotificationTemplatesModule,
    HealthModule,
    NotificationConfigModule,
    SharedModule,
    RouterModule.register(routes), 
    UserrolesModule,
    LocationsModule,
    RolesModule,
    UserLeavesModule,
    RolesModule,
    LeaveTypeModule,
    CompanyModule,
    UserCompanyModule,
    UserLeaveBalanceModule,
    LeaveRequestSettingModule,
    LeaveEncashmentModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'auth', method: RequestMethod.ALL },
        { path: 'auth/(.*)', method: RequestMethod.ALL }
      ) // Exclude all paths under 'auth'
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // Apply to all other routes
  }
}
