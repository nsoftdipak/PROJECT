import { PartialType } from '@nestjs/swagger';
import { CreateLeaveEncashmentDto } from './create-leave-encashment.dto';

export class UpdateLeaveEncashmentDto extends PartialType(CreateLeaveEncashmentDto) {}
