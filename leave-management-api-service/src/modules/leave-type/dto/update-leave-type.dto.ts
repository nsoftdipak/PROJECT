export class UpdateLeaveTypeDto {
  name?: string;
  description?: string;
  is_active?: boolean;
  updated_by: number;
  max_carry_forward?: number;
  yearly_leaves?: number;
  is_encashable?: boolean;
}
