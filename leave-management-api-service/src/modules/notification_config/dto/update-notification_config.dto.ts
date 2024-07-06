import { IsBoolean, IsOptional , IsNumber} from 'class-validator';

export class UpdateNotificationConfigDto {
  @IsBoolean()
  @IsOptional()
  is_mail?: boolean;

  @IsBoolean()
  @IsOptional()
  is_push?: boolean;

  @IsNumber()
  @IsOptional()
  notification_type_id?: number;
}
