import { IsInt, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserLeaveBalanceDto {
  @IsOptional()
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsInt()
  leave_type: number;

  @IsOptional()
  @IsNumber()
  prorated_balance?: number;

  @IsOptional()
  @IsNumber()
  current_balance?: number;

  @IsOptional()
  @IsNumber()
  compensatory_count: number;
}
