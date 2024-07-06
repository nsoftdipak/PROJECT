import { IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class UpdateNotificationTemplateDto {
  @IsOptional()
  content: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;

  @IsOptional()
  @IsNumber()
  updated_by_id: number;
}
