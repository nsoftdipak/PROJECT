import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class CreateNotificationTypeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;

  @IsNotEmpty()
  @IsNumber()
  created_by_id: number;
}
