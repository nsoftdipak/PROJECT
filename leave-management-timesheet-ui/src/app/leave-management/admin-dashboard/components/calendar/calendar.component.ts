import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateModalComponent } from './date-modal/date-modal.component';
import { CalenderService } from './calender.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {};
  selectedLeaveStatus: string = 'Leave Status';

  constructor(private calenderService: CalenderService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.initializeCalendarOptions();
    // this.loadHolidays();
  }

  initializeCalendarOptions(): void {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      height: 'auto',
      navLinks: true,
      events: [],
      dateClick: this.handleDateClick.bind(this),
      eventContent: (arg) => {
        const { event } = arg;
        const startDate = event.start ? new Date(event.start).toDateString() : '';
        const endDate = event.end ? new Date(event.end).toDateString() : '';
        const isApproved = event.extendedProps['status'] === 'Approved';

        let content = `<div class="event-title">${event.title}</div>`;
        if (isApproved) {
          content += `<div class="event-subtitle">Start: ${startDate}</div>`;
          content += `<div class="event-subtitle">End: ${endDate}</div>`;
        } else {
          content += `<div class="event-subtitle">From: ${startDate} To: ${endDate}</div>`;
        }

        return { html: content };
      },
      eventClassNames: (arg) => {
        if (arg.event.extendedProps['status'] === 'Approved') {
          return ['event-approved'];
        } else if (arg.event.extendedProps['status'] === 'Rejected') {
          return ['event-rejected'];
        } else {
          return ['event-cancelled'];
        }
      }
    } as CalendarOptions;
  }

  setLeaveStatus(label: string, status: string): void {
    this.selectedLeaveStatus = label;
    this.loadLeavesByStatus(status);
  }

  loadLeavesByStatus(status: string): void {
    this.calenderService.getLeavesByStatus(status).subscribe(leaves => {
      const events = leaves.map(leave => ({
        title: `Leave: ${leave.user.name}`,
        start: leave.from_date,
        end: leave.to_date,
        extendedProps: {
          status: leave.status,
        },
      }));
      this.calendarOptions.events = events;
    });
  }

  handleDateClick(arg: { dateStr: string }): void {
    const selectedDate = new Date(arg.dateStr);
    const modalRef = this.modalService.open(DateModalComponent);
    modalRef.componentInstance.selectedDate = selectedDate;
    modalRef.result.then((result) => {
      if (result) {
        console.log('Modal closed with result:', result);
      }
    }, (reason) => {
      console.log('Dismissed', reason);
    });
  }

  createReport(): void {
    this.router.navigate(['/leave-management/admin-dashboard/reports']);
  }

  navigateToLeaveCalendar(): void {
    this.router.navigate(['/leave-management/admin-dashboard/leave-calendar']);
  }
}
