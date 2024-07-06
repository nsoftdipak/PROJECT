import { IsNotEmpty, IsBoolean, IsNumber, IsDate, IsString } from 'class-validator';
import { User } from 'src/shared/entities/user.entity';

export class CreateLeaveTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;

  @IsNotEmpty()
  @IsNumber()
  created_by: User;

  @IsNotEmpty()
  @IsNumber()
  updated_by: User;

  @IsNotEmpty()
  @IsDate()
  created_at: Date;

  @IsNotEmpty()
  @IsDate()
  updated_at: Date;

  @IsNotEmpty()
  max_carry_forward:number;


  @IsNotEmpty()
   yearly_leaves:number;
  

   @IsNotEmpty()
   is_encashable:boolean
}
