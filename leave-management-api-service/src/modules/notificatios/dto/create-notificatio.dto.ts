


import { IsNotEmpty, IsBoolean, IsNumber, IsDate } from 'class-validator';

export class CreateNotificatioDto {
  @IsNotEmpty()
  @IsNumber()
  type_id: number;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  template_id: number;

  @IsNotEmpty()
  data: any;

  @IsNotEmpty()
  @IsBoolean()
  is_read: boolean;

  @IsNotEmpty()
  @IsDate()
  created_at: Date;

  @IsNotEmpty()
  @IsDate()
  updated_at: Date;
}
