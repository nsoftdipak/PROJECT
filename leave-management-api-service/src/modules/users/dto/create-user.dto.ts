export class CreateUserDto {
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  country_code: string;
  date_of_joining: Date;
  location_id: number;
  company?: number;  // Optional company ID
  created_by: number;
  updated_by: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
}
