import { Component, OnInit } from '@angular/core';
import { CalenderService } from '../calender/calender.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  userLeave: any[] = [];

  constructor(private calendarService: CalenderService) {}

  ngOnInit(): void {
    this.getUserLeave();
  }

  getUserLeave(): void {
    this.calendarService.getUserLeave().subscribe(
      (response) => {
        this.userLeave = response;
      },
      (error) => {
        console.error('Error fetching user leave data:', error);
      }
    );
  }
}
