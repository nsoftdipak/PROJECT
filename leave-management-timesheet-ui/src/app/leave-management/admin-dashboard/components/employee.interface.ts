export interface Employee {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile_no: string;
    country_code: string;
    is_active: boolean;
    date_of_joining: string;
    created_at: string;
    updated_at: string;
    location: {
      id: number;
      name: string;
      is_active: boolean;
    };
    userRoles: {
      id: number;
      is_active: boolean;
      created_at: string;
      updated_at: string;
      role: {
        id: number;
        name: string;
        description: string;
        is_active: boolean;
      };
    }[];
  }
  