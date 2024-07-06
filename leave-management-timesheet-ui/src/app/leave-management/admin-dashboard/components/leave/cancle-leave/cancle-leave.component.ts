import { Component, OnInit } from '@angular/core';
import { LeaveServiceService } from '../leave-service.service';

@Component({
  selector: 'app-cancle-leave',
  templateUrl: './cancle-leave.component.html',
  styleUrls: ['./cancle-leave.component.css']
})
export class CancleLeaveComponent implements OnInit {
  canceledLeaves: any[] = [];

  constructor(private leaveService: LeaveServiceService) {}

  ngOnInit() {
    this.getCanceledLeaves();
  }

  getCanceledLeaves() {
    this.leaveService.getLeavesByStatus('canceled')
      .subscribe(data => {
        this.canceledLeaves = data;
      }, error => {
        console.error('Error fetching canceled leaves:', error);
      });
  }
}
