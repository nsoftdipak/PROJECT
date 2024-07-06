import { Component, OnInit } from '@angular/core';
import { LeaveServiceService } from '../leave-service.service';

@Component({
  selector: 'app-reject-leave',
  templateUrl: './reject-leave.component.html',
  styleUrl: './reject-leave.component.css'
})
export class RejectLeaveComponent implements OnInit {
  canceledLeaves: any[] = [];

  showLeaves: boolean = false; 
  

  constructor(private leaveService: LeaveServiceService) {}

  ngOnInit() {
    this.getCanceledLeaves();
  }

  getCanceledLeaves() {
    this.leaveService.getLeavesByStatus('rejected')
      .subscribe(data => {
        this.canceledLeaves = data;
      }, error => {
        console.error('Error fetching canceled leaves:', error);
      });
  }
}
