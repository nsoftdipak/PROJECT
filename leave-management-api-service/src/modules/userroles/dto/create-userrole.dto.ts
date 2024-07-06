import { IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserroleDto {
  @IsInt()
  user_id: number;

  @IsInt()
  role_id: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsInt()
  @IsOptional()
  created_by?: number;

  @IsInt()
  @IsOptional()
  updated_by?: number;
}
