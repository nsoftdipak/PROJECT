// create-leave-encashment.dto.ts
import { IsInt, IsDecimal, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateLeaveEncashmentDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  leaveDays: number;

  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @IsEnum(['Pending', 'Done'])
  status: 'Pending' | 'Done';
}



