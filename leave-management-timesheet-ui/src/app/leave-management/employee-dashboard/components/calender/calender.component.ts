import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplyLeaveModalComponent } from '../apply-leave-modal/apply-leave-modal.component';
import { CalenderService } from './calender.service';

interface Holiday {
  id: number;
  occasion: string;
  occasion_date: string;
  is_optional: boolean;
  created_at: string;
  updated_at: string;
}

interface UserLeave {
  id: number;
  half_day: boolean | string;
  from_date: string;
  to_date: string;
  status: string;
  is_auto_approved: any;
  comments: string;
  attachments: string;
  created_at: string;
  updated_at: string;
  user: {
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
    reporting_manager: number;
    date_of_resignation: string | null;
    date_of_exit: string | null;
  };
}

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  calendarOptions: any;
  holidays: Holiday[] = [];
  userLeaves: UserLeave[] = [];

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private calendarService: CalenderService
  ) {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        list: 'List'
      },
      titleFormat: { year: 'numeric', month: 'long' }, // Show full month name and year
      dateClick: this.handleDateClick.bind(this),
      editable: true,
      droppable: true,
    };
  }

  ngOnInit(): void {
    this.fetchHolidays();
    this.getLeaveStatus();
  }

  fetchHolidays(): void {
    this.calendarService.getHolidays().subscribe(
      (holidays: Holiday[]) => {
        this.holidays = holidays;
        this.updateCalendarEvents();
      },
      (error: any) => {
        console.error('Error fetching holidays:', error);
      }
    );
  }

  getLeaveStatus(): void {
    this.calendarService.getLeaveStatus().subscribe(
      (response: UserLeave[]) => {
        this.userLeaves = response;
        this.updateCalendarEvents();
      },
      (error: any) => {
        console.error('Error fetching user leaves:', error);
      }
    );
  }

  updateCalendarEvents(): void {
    const holidayEvents = this.holidays.map(holiday => ({
      title: holiday.occasion,
      start: holiday.occasion_date,
      color: 'red'
    }));

    const leaveEvents = this.userLeaves.map(leave => ({
      title: `${leave.status} - ${leave.user.first_name} ${leave.user.last_name}`,
      start: leave.from_date,
      end: new Date(new Date(leave.to_date).setDate(new Date(leave.to_date).getDate() + 1)).toISOString().split('T')[0],
      color: this.getLeaveStatusColor(leave.status),
      textColor: 'white' // Ensuring the text color is visible
    }));

    this.calendarOptions.events = [...holidayEvents, ...leaveEvents];
  }

  getLeaveStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'green';
      case 'pending':
        return 'orange';
      case 'rejected':
        return 'red';
      case 'canceled':
        return 'grey';
      default:
        return 'blue';
    }
  }

  handleDateClick(arg: any) {
    const selectedDate = new Date(arg.dateStr);
    if (this.isHoliday(arg.dateStr) || this.isWeekend(selectedDate)) {
      return; // Do not open the modal if the date is a holiday or weekend
    }
    const modalRef = this.modalService.open(ApplyLeaveModalComponent);
    modalRef.componentInstance.selectedDate = arg.dateStr;
  }

  isHoliday(dateStr: string): boolean {
    return this.holidays.some(holiday => holiday.occasion_date.startsWith(dateStr));
  }

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
  }
}
