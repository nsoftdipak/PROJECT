import { IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class UpdateNotificationTypeDto {
  @IsOptional()
  name: string;

  @IsOptional()
  description: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
