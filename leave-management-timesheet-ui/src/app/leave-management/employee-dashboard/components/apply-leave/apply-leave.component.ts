import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../components/services/master.service';
import { LeaveType } from './leave.interfaces';
import { jwtDecode } from 'jwt-decode';
import { Observable, catchError } from 'rxjs';
import { h } from '@fullcalendar/core/preact';

interface Holiday {
  id: number;
  occasion: string;
  occasion_date: string;
  is_optional: boolean;
  created_at: string;
  updated_at: string;
}
@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css'],
})
export class ApplyLeaveComponent implements OnInit {


  holidayname:any;
    userId:number|null=null;
  users: any[] = [];
  leaveTypes: LeaveType[] = [];
  selectedLeaveTypeId: number | null = null;
  halfDay: string | null = null;

  currentDate: Date = new Date();
  daysInMonth: Date[] = [];
  selectedDate: Date | null = null;
  selectedEndDate: Date | null = null;
  totalLeaveDays: number | null = null;
  message: string = '';
  assignedToId: number|null=null ;
  showLeaveForm = false;
  currentMonth: Date = new Date();
  returningWorkDate: string = '';
  status: string = 'Pending';
  isAutoApproved: boolean = false;
  comments: string = '';
  attachments: string = '';
  createdBy: number | null = null;
  updatedBy: number | null = null;

  constructor(
    private datePipe: DatePipe,
    private masterService: MasterService,
    private http: HttpClient
  ) {
    this.generateCalendar();
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token)
      const userIdStr = decodedToken.sub; // Assuming 'sub' holds the user ID
      
        this.userId = Number(userIdStr); // Convert to number
        // alert( this.userId);
        // alert( typeof this.userId);
      
   
    }
    //  alert(this.userId) 
        this.getAllAdmins();
    this.fetchLeaveTypes();
    // this.getHolidays();
    // this.holidayname= this.masterService.getHolidays()
    this.getHolidays();
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

  generateCalendar() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1));
  }

  isCurrentDay(day: Date): boolean {
    return day.getDate() === this.currentDate.getDate();
  }

  isWeekend(day: Date): boolean {
    const dayOfWeek = day.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }

  generateMonthDates(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = [];
    for (let i = 1; i <= daysInMonth; i++) {
      this.daysInMonth.push(new Date(year, month, i));
    }
  }

  changeMonth(offset: number) {
    const newDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + offset, 1);
    this.currentDate = newDate;
    this.generateMonthDates(newDate);
  }

  calculateTotalLeaveDays() {
    if (this.selectedDate && this.selectedEndDate) {
      const startDate = new Date(this.selectedDate);
      const endDate = new Date(this.selectedEndDate);
      let totalDays = 0;

      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const currentDay = new Date(d);
        if (!this.isWeekend(currentDay)) {
          totalDays++;
        }
      }
      this.totalLeaveDays = totalDays;
    } else {
      this.totalLeaveDays = 0;
    }
  }

  onEndDateChanged() {
    this.calculateTotalLeaveDays();
    this.calculateReturningDate();
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.calculateTotalLeaveDays();
  }

  calculateReturningDate() {
    if (this.selectedEndDate) {
      const end = new Date(this.selectedEndDate);
      const returningOnWorkDate = new Date(end);
      returningOnWorkDate.setDate(returningOnWorkDate.getDate() + 1);
      while (returningOnWorkDate.getDay() === 0 || returningOnWorkDate.getDay() === 6) {
        returningOnWorkDate.setDate(returningOnWorkDate.getDate() + 1);
      }
      this.returningWorkDate = this.datePipe.transform(returningOnWorkDate, 'dd/MM/yyyy') || '';
    } else {
      this.returningWorkDate = '';
    }
  }


  getHolidays(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3001/holidays');
  }
  applyLeave() {
    // alert(this.holidayname.occasion);
    // alert("hello")
    const leaveApplication = {
      userId: Number(this.userId),  // Ensure this is the correct userId
      halfDay: this.halfDay,
      fromDate: this.selectedDate,
      toDate: this.selectedEndDate,
      assignedToId: Number(this.assignedToId),
      status: 'Pending',
      isAutoApproved: false,
      comments: this.message,
      attachments: '',
      createdBy: Number(this.userId),  // Also ensure createdBy and updatedBy are set correctly
      updatedBy:  Number(this.userId),
      createdAt: new Date(),
      updatedAt: new Date(),
      leaveTypeId: this.selectedLeaveTypeId
    };
  
    this.http.post('http://localhost:3001/user-leaves', leaveApplication)
      .subscribe(
        (response) => {
          alert('Leave application submitted successfully');
          // Handle success response
        },
        (error) => {
          alert('Error submitting leave application');
          // Handle error
        }
      );
  }
  


  getMinEndDate(): string {
    if (this.selectedDate) {
      const minDate = new Date(this.selectedDate);
      minDate.setDate(minDate.getDate() + 1); 
      return minDate.toISOString().split('T')[0];
    } else {
      return '';
    }
  }

  // getHolidays() {
  //   this.masterService.getHolidays().subscribe(
  //     (data: any[]) => {
  //       this.holiday = data;
  //       alert(data)
  //     },
  //     (error: any) => {
  //       console.error('Error fetching holidays:', error);
  //     }
  //   );
  // }

  

  // Function to determine occasion based on selected date
  getOccasionForSelectedDate(): string {
  if (this.selectedDate) {
    const selectedDateString = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
    const holiday = this.  holidayname .find((h: Holiday) => h.occasion_date === selectedDateString);
    return holiday ? holiday.occasion : '';
  }
  return '';
}
}


// import { DatePipe } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { MasterService } from '../../../../components/services/master.service';
// import { LeaveType } from './leave.interfaces';
// import { Observable } from 'rxjs';
// import { jwtDecode } from 'jwt-decode';

// interface Holiday {
//   id: number;
//   occasion: string;
//   occasion_date: string;
//   is_optional: boolean;
//   created_at: string;
//   updated_at: string;
// }

// @Component({
//   selector: 'app-apply-leave',
//   templateUrl: './apply-leave.component.html',
//   styleUrls: ['./apply-leave.component.css'],
// })
// export class ApplyLeaveComponent implements OnInit {
//   holidayname: Holiday[] = [];
//   userId: number | null = null;
//   users: any[] = [];
//   leaveTypes: LeaveType[] = [];
//   selectedLeaveTypeId: number | null = null;
//   halfDay: string | null = null;

//   currentDate: Date = new Date();
//   daysInMonth: Date[] = [];
//   selectedDate: Date | null = null;
//   selectedEndDate: Date | null = null;
//   totalLeaveDays: number | null = null;
//   message: string = '';
//   approver: number | null = null;
//   showLeaveForm = false;
//   currentMonth: Date = new Date();
//   returningWorkDate: string = '';
//   status: string = 'Pending';
//   isAutoApproved: boolean = false;
//   comments: string = '';
//   attachments: string = '';
//   createdBy: number | null = null;
//   updatedBy: number | null = null;

//   constructor(
//     private datePipe: DatePipe,
//     private masterService: MasterService,
//     private http: HttpClient
//   ) {
//     this.generateCalendar();
//   }

//   ngOnInit(): void {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken: any = jwtDecode(token);
//       const userIdStr = decodedToken.sub; // Assuming 'sub' holds the user ID
//       this.userId = Number(userIdStr); // Convert to number
//     }

//     this.getAllAdmins();
//     this.fetchLeaveTypes();
//     this.getHolidays().subscribe(
//       (holidays: Holiday[]) => {
//         this.holidayname = holidays;
//         alert(JSON.stringify(holidays));
//       },
//       (error: any) => {
//         console.error('Error fetching holidays:', error);
//       }
//     );
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

//   generateCalendar() {
//     const year = this.currentDate.getFullYear();
//     const month = this.currentDate.getMonth();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     this.daysInMonth = Array.from({ length: daysInMonth }, (_, index) => new Date(year, month, index + 1));
//   }

//   isCurrentDay(day: Date): boolean {
//     return day.getDate() === this.currentDate.getDate();
//   }

//   isWeekend(day: Date): boolean {
//     const dayOfWeek = day.getDay();
//     return dayOfWeek === 0 || dayOfWeek === 6;
//   }

//   generateMonthDates(date: Date) {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     this.daysInMonth = [];
//     for (let i = 1; i <= daysInMonth; i++) {
//       this.daysInMonth.push(new Date(year, month, i));
//     }
//   }

//   changeMonth(offset: number) {
//     const newDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + offset, 1);
//     this.currentDate = newDate;
//     this.generateMonthDates(newDate);
//   }

//   calculateTotalLeaveDays() {
//     if (this.selectedDate && this.selectedEndDate) {
//       const startDate = new Date(this.selectedDate);
//       const endDate = new Date(this.selectedEndDate);
//       let totalDays = 0;

//       for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
//         const currentDay = new Date(d);
//         if (!this.isWeekend(currentDay)) {
//           totalDays++;
//         }
//       }
//       this.totalLeaveDays = totalDays;
//     } else {
//       this.totalLeaveDays = 0;
//     }
//   }

//   onEndDateChanged() {
//     this.calculateTotalLeaveDays();
//     this.calculateReturningDate();
//   }

//   selectDate(date: Date) {
//     this.selectedDate = date;
//     this.calculateTotalLeaveDays();
//   }

//   calculateReturningDate() {
//     if (this.selectedEndDate) {
//       const end = new Date(this.selectedEndDate);
//       const returningOnWorkDate = new Date(end);
//       returningOnWorkDate.setDate(returningOnWorkDate.getDate() + 1);
//       while (returningOnWorkDate.getDay() === 0 || returningOnWorkDate.getDay() === 6) {
//         returningOnWorkDate.setDate(returningOnWorkDate.getDate() + 1);
//       }
//       this.returningWorkDate = this.datePipe.transform(returningOnWorkDate, 'dd/MM/yyyy') || '';
//     } else {
//       this.returningWorkDate = '';
//     }
//   }

//   getHolidays(): Observable<Holiday[]> {
//     return this.http.get<Holiday[]>('http://localhost:3001/holidays');
//   }

//   applyLeave() {
//     const leaveApplication = {
//       userId: this.userId,
//       halfDay: this.halfDay,
//       fromDate: this.selectedDate,
//       toDate: this.selectedEndDate,
//       assignedTo: Number(this.approver),
//       status: 'Pending',
//       isAutoApproved: false,
//       comments: this.message,
//       attachments: '',
//       createdBy: this.userId,
//       updatedBy: this.userId,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       leaveTypeId: this.selectedLeaveTypeId
//     };

//     this.http.post('http://localhost:3001/user-leaves', leaveApplication)
//       .subscribe(
//         (response) => {
//           alert('Leave application submitted successfully');
//         },
//         (error) => {
//           alert('Error submitting leave application');
//         }
//       );
//   }

//   getMinEndDate(): string {
//     if (this.selectedDate) {
//       const minDate = new Date(this.selectedDate);
//       minDate.setDate(minDate.getDate() + 1);
//       return minDate.toISOString().split('T')[0];
//     } else {
//       return '';
//     }
//   }

//   getOccasionForSelectedDate(): string {
//     if (this.selectedDate) {
//       const selectedDateString = this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd');
//       const holiday = this.holidayname.find((h: Holiday) => h.occasion_date === selectedDateString);
//       return holiday ? holiday.occasion : '';
//     }
//     return '';
//   }
// }
