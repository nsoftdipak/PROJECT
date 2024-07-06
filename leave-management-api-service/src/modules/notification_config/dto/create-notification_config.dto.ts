import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateNotificationConfigDto {
  @IsBoolean()
  @IsNotEmpty()
  is_mail: boolean;

  @IsBoolean()
  @IsNotEmpty()
  is_push: boolean;

  @IsNumber()
  @IsNotEmpty()
  notification_type_id: number;
}
