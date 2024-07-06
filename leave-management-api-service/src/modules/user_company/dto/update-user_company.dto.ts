import { PartialType } from '@nestjs/swagger';
import { CreateUserCompanyDto } from './create-user_company.dto';

export class UpdateUserCompanyDto extends PartialType(CreateUserCompanyDto) {}
