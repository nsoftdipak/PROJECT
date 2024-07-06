import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyLeafDto } from './create-company_leaf.dto';

export class UpdateCompanyLeafDto extends PartialType(CreateCompanyLeafDto) {}
