export class UpdateUserLeafDto {
    userId?: number;
    companyLeaveId?: number;
    halfDay?: boolean;
    fromDate?: Date;
    toDate?: Date;
    assignedToId?: number;
    status?: string;
    isAutoApproved?: boolean;
    comments?: string;
    attachments?: string;
    updatedById?: number;
  }
  