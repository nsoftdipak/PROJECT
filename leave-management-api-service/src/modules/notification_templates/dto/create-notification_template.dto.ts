import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class CreateNotificationTemplateDto {
  @IsNotEmpty()
  @IsNumber()
  type_id: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;

  @IsNotEmpty()
  @IsNumber()
  created_by_id: number;
}
