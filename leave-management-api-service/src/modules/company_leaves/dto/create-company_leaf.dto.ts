import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCompanyLeafDto {
  @IsNumber()
  userId: number;

  @IsString()
  leaveTypeName: string;

  @IsBoolean()
  is_active: boolean;

  @IsNumber()
  max_carry_forward: number;

  @IsNumber()
  yearly_leaves: number;

  @IsBoolean()
  is_encashable: boolean;
}
