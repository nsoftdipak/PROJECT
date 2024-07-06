import { BlobOptions } from 'buffer';
import { IsNotEmpty, IsOptional, IsString, IsDate, IsBoolean } from 'class-validator';

export class CreateUserLeafDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  leaveTypeId: number;

  @IsOptional()
  @IsString()
  halfDay: boolean;

  @IsNotEmpty()
  @IsDate()
  fromDate: Date;

  @IsNotEmpty()
  @IsDate()
  toDate: Date;

  @IsOptional()
  assignedToId: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsOptional()
  @IsBoolean()
  isAutoApproved: boolean;

  @IsOptional()
  comments: string;

  @IsOptional()
  attachments: string;

  @IsNotEmpty()
  createdById: number;

  @IsOptional()
  updatedById: number;
}
