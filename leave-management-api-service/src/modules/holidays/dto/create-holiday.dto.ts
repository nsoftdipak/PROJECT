import { IsDate, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { User } from 'src/shared/entities/user.entity';

export class CreateHolidayDto {
  @IsNotEmpty()
  occasion: string;

  @IsDate()
  occasion_date: Date;

  @IsBoolean()
  is_optional: boolean;

  @IsNumber()
  created_by: User; // Rename to created_by

  @IsNumber()
  updated_by: User; // Rename to updated_by

  @IsNumber()
  location: number; // Rename to location
}
