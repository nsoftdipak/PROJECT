

import { IsOptional, IsBoolean, IsDate } from 'class-validator';

export class UpdateNotificatioDto {
  @IsOptional()
  @IsBoolean()
  is_read: boolean;

  @IsOptional()
  @IsDate()
  updated_at: Date;
}
