import { Module } from '@nestjs/common';
import { UserCompanyService } from './user_company.service';
import { UserCompanyController } from './user_company.controller';

@Module({
  controllers: [UserCompanyController],
  providers: [UserCompanyService],
})
export class UserCompanyModule {}
