import { PartialType } from '@nestjs/swagger';
import { CreateLeaveRequestSettingDto } from './create-leave-request-setting.dto';

export class UpdateLeaveRequestSettingDto extends PartialType(CreateLeaveRequestSettingDto) {}
