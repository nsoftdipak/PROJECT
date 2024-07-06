import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../../../../components/services/master.service';
import { LeaveType } from '../apply-leave/leave.interfaces';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CalenderService } from '../calender/calender.service';

interface Holiday {
  id: number;
  occasion: string;
  occasion_date: string;
  is_optional: boolean;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-apply-leave-modal',
  templateUrl: './apply-leave-modal.component.html',
  styleUrls: ['./apply-leave-modal.component.css'],
})
export class ApplyLeaveModalComponent implements OnInit {
  @Input() selectedDate: string | null = null;
  selectedEndDate: string | null = null;
  totalLeaveDays: number | null = null;
  returningWorkDate: string | null = null;
  halfDay: string | null = null;
  selectedLeaveTypeId: string | null = null;
  leaveTypes: LeaveType[] = [];
  message: string | null = null;
  assignedToId: string | null = null;
  users: any[] = [];
  holidayname: Holiday[] = [];
  userId: number | null = null;
  leaveData:any[]=[];

  constructor(
    public activeModal: NgbActiveModal,
    private datePipe: DatePipe,
    private masterService: MasterService,
    private http: HttpClient, 
    private calenderService:CalenderService
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = Number(decodedToken.sub);
    }

    this.getAllAdmins();
    this.fetchLeaveTypes();
    this.getHolidays().subscribe(
      (holidays: Holiday[]) => {
        this.holidayname = holidays;
      },
      (error: any) => {
        console.error('Error fetching holidays:', error);
      }
    );

    // Set the default end date to be the same as the start date
    this.selectedEndDate = this.selectedDate;
    this.totalLeaveDays = this.calculateTotalLeaveDays();
    this.returningWorkDate = this.calculateReturningWorkDate();
  }

  getAllAdmins(): void {
    this.masterService.getAllUsers().subscribe(
      (data: any[]) => {
        this.users = data;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  fetchLeaveTypes(): void {
    this.http.get<LeaveType[]>('http://localhost:3001/leave').subscribe(
      (data: LeaveType[]) => {
        this.leaveTypes = data;
      },
      (error: any) => {
        console.error('Error fetching leave types:', error);
      }
    );
  }

  getHolidays(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>('http://localhost:3001/holidays');
  }

  getMinEndDate() {
    return this.selectedDate;
  }

  onStartDateChanged() {
    if (!this.selectedEndDate) {
      this.selectedEndDate = this.selectedDate;
    }
    this.onDateChanged();
  }

  onEndDateChanged() {
    if (!this.selectedEndDate) {
      this.selectedEndDate = this.selectedDate;
    }
    this.onDateChanged();
  }

  onDateChanged() {
    this.totalLeaveDays = this.calculateTotalLeaveDays();
    this.returningWorkDate = this.calculateReturningWorkDate();
  }

  calculateTotalLeaveDays() {
    if (!this.selectedDate || !this.selectedEndDate) {
      return 0;
    }
    const start = new Date(this.selectedDate);
    const end = new Date(this.selectedEndDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  }

  calculateReturningWorkDate() {
    if (!this.selectedEndDate) {
      return '';
    }
    const end = new Date(this.selectedEndDate);
    end.setDate(end.getDate() + 1);
    return end.toISOString().split('T')[0];
  }

  applyLeave() {
    const leaveApplication = {
      userId: this.userId,
      halfDay: this.halfDay,
      fromDate: this.selectedDate,
      toDate: this.selectedEndDate,
      assignedToId: Number(this.assignedToId),
      status: 'Pending',
      isAutoApproved: false,
      comments: this.message,
      attachments: '',
      createdBy: this.userId,
      updatedBy: this.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      leaveTypeId: this.selectedLeaveTypeId
    };

    this.http.post('http://localhost:3001/user-leaves', leaveApplication).subscribe(
      (response) => {
        alert('Leave application submitted successfully');
        this.activeModal.close();
      },
      (error) => {
        alert('Error submitting leave application');
      }
    );
  }

  getOccasionForSelectedDate(): string {
    if (this.selectedDate) {
      const selectedDateString = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
      const holiday = this.holidayname.find((h) => h.occasion_date === selectedDateString);
      return holiday ? holiday.occasion : '';
    }
    return '';
  }



  getLeaveStatus(){
      this.calenderService.getLeaveStatus().subscribe((responce)=>{
        this.leaveData=responce;
      })
  }
}






// import { DatePipe } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, Input, OnInit } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { MasterService } from '../../../../components/services/master.service';
// import { LeaveType } from '../apply-leave/leave.interfaces';
// import { Observable } from 'rxjs';
// import { jwtDecode } from 'jwt-decode';
// import { CalenderService } from '../calender/calender.service';
// import { LeaveApplyService } from '../apply-leave/leave-apply.service';

// interface Holiday {
//   id: number;
//   occasion: string;
//   occasion_date: string;
//   is_optional: boolean;
//   created_at: string;
//   updated_at: string;
// }

// @Component({
//   selector: 'app-apply-leave-modal',
//   templateUrl: './apply-leave-modal.component.html',
//   styleUrls: ['./apply-leave-modal.component.css'],
// })
// export class ApplyLeaveModalComponent implements OnInit {
//   @Input() selectedDate: string | null = null;
//   selectedEndDate: string | null = null;
//   totalLeaveDays: any;
//   returningWorkDate: string | null = null;
//   halfDay: string | null = null;
//   selectedLeaveTypeId: string | null = null;
//   leaveTypes: LeaveType[] = [];
//   message: string | null = null;
//   assignedToId: string | null = null;
//   users: any[] = [];
//   holidayname: Holiday[] = [];
//   userId: any;
//   leaveData: any[] = [];
//   leavePolicyErrorMessage: string | null = null;

//   constructor(
//     public activeModal: NgbActiveModal,
//     private datePipe: DatePipe,
//     private masterService: MasterService,
//     private http: HttpClient, 
//     private calenderService: CalenderService,
//     private applyLeaveService:LeaveApplyService
//   ) {}

//   ngOnInit() {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken: any = jwtDecode(token);
//       this.userId = Number(decodedToken.sub);
//     }

//     this.getAllAdmins();
//     this.fetchLeaveTypes();
//     this.getHolidays().subscribe(
//       (holidays: Holiday[]) => {
//         this.holidayname = holidays;
//       },
//       (error: any) => {
//         console.error('Error fetching holidays:', error);
//       }
//     );

//     // Set the default end date to be the same as the start date
//     this.selectedEndDate = this.selectedDate;
//     this.totalLeaveDays = this.calculateTotalLeaveDays();
//     this.returningWorkDate = this.calculateReturningWorkDate();
//   }

//   getAllAdmins(): void {
//     this.masterService.getAllUsers().subscribe(
//       (data: any[]) => {
//         this.users = data;
//       },
//       (error: any) => {
//         console.error('Error fetching users:', error);
//       }
//     );
//   }

//   fetchLeaveTypes(): void {
//     this.http.get<LeaveType[]>('http://localhost:3001/leave').subscribe(
//       (data: LeaveType[]) => {
//         this.leaveTypes = data;
//       },
//       (error: any) => {
//         console.error('Error fetching leave types:', error);
//       }
//     );
//   }

//   getHolidays(): Observable<Holiday[]> {
//     return this.http.get<Holiday[]>('http://localhost:3001/holidays');
//   }

//   getMinEndDate() {
//     return this.selectedDate;
//   }

//   onStartDateChanged() {
//     if (!this.selectedEndDate) {
//       this.selectedEndDate = this.selectedDate;
//     }
//     this.onDateChanged();
//   }

//   onEndDateChanged() {
//     if (!this.selectedEndDate) {
//       this.selectedEndDate = this.selectedDate;
//     }
//     this.onDateChanged();
//   }

//   onDateChanged() {
//     this.totalLeaveDays = this.calculateTotalLeaveDays();
//     this.returningWorkDate = this.calculateReturningWorkDate();
//   }

//   calculateTotalLeaveDays() {
//     if (!this.selectedDate || !this.selectedEndDate) {
//       return 0;
//     }
//     const start = new Date(this.selectedDate);
//     const end = new Date(this.selectedEndDate);
//     const diffTime = Math.abs(end.getTime() - start.getTime());
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//     return diffDays;
//   }

//   calculateReturningWorkDate() {
//     if (!this.selectedEndDate) {
//       return '';
//     }
//     const end = new Date(this.selectedEndDate);
//     end.setDate(end.getDate() + 1);
//     return end.toISOString().split('T')[0];
//   }

//   applyLeave() {
//     if (!this.selectedLeaveTypeId) {
//       this.leavePolicyErrorMessage = 'Please select a leave type.';
//       return;
//     }

//     this.applyLeaveService.checkLeavePolicy(this.selectedLeaveTypeId, this.userId, this.totalLeaveDays).subscribe(
//       (policyResult) => {
//         if (policyResult.isAllowed) {
//           const leaveApplication = {
//             userId: this.userId,
//             halfDay: this.halfDay,
//             fromDate: this.selectedDate,
//             toDate: this.selectedEndDate,
//             assignedToId: Number(this.assignedToId),
//             status: 'Pending',
//             isAutoApproved: false,
//             comments: this.message,
//             attachments: '',
//             createdBy: this.userId,
//             updatedBy: this.userId,
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             leaveTypeId: this.selectedLeaveTypeId
//           };

//           this.http.post('http://localhost:3001/user-leaves', leaveApplication).subscribe(
//             (response) => {
//               alert('Leave application submitted successfully');
//               this.activeModal.close();
//             },
//             (error) => {
//               alert('Error submitting leave application');
//             }
//           );
//         } else {
//           this.leavePolicyErrorMessage = policyResult.message;
//         }
//       },
//       (error) => {
//         console.error('Error checking leave policy:', error);
//       }
//     );
//   }

//   getOccasionForSelectedDate(): string {
//     if (this.selectedDate) {
//       const selectedDateString = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
//       const holiday = this.holidayname.find((h) => h.occasion_date === selectedDateString);
//       return holiday ? holiday.occasion : '';
//     }
//     return '';
//   }

//   getLeaveStatus(){
//     this.calenderService.getLeaveStatus().subscribe((response)=>{
//       this.leaveData = response;
//     });
//   }
// }