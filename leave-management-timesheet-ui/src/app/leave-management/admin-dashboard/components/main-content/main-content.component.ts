import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../../components/services/master.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from 'express';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  todaysLeaves: any[] = []; // Variable to store today's leaves
  holidays: any[] = [];

  loggedInUserId: number | null = null;
  usersCount: number = 0; // Variable to store the count of users
  comanyes:number=0;
  holidayscount:number=0;
  itemsPerPage: number = 10;
  currentPageLeaves: number = 1;
  currentPageHolidays: number = 1;
  pagedLeaves: any[] = [];
  pagedHolidays: any[] = [];
  totalPagesLeaves: number = 0;
  totalPagesHolidays: number = 0;

  constructor(private masterService: MasterService, private http:HttpClient) {}

  ngOnInit(): void {
    this.fetchTodaysLeaves();
    this.getHolidaysList();
    this.getAllCompany()
    this.loggedInUserId = this.masterService.getAdminId();
    this.http.get(`http://localhost:3001/users/data?adminId=${this.loggedInUserId}`)
      .subscribe(
        (response: any) => {
          this.usersCount = response.length; // Assuming 'response' contains the user data array
        },
        error => {
          console.error('Error:', error);
        }
      );
  }

  fetchTodaysLeaves(): void {
    this.masterService.getTodaysLeaves().subscribe((data: any[]) => {
      this.todaysLeaves = data;
      this.initializePagination('leaves');
      console.log(data);
    });
  }

  getHolidaysList(): void {
    this.masterService.getHolidays().subscribe((data: any[]) => {
      this.holidays = data;
      this.holidayscount=data.length
      this.initializePagination('holidays');
      console.log(data);
    });
  }

  initializePagination(type: string) {
    if (type === 'leaves') {
      this.totalPagesLeaves = Math.ceil(this.todaysLeaves.length / this.itemsPerPage);
      this.updatePagedData('leaves');
    } else {
      this.totalPagesHolidays = Math.ceil(this.holidays.length / this.itemsPerPage);
      this.updatePagedData('holidays');
    }
  }

  updatePagedData(type: string) {
    const startIndex = (type === 'leaves' ? this.currentPageLeaves : this.currentPageHolidays - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    if (type === 'leaves') {
      this.pagedLeaves = this.todaysLeaves.slice(startIndex, endIndex);
    } else {
      this.pagedHolidays = this.holidays.slice(startIndex, endIndex);
    }
  }

  changePage(direction: string, type: string) {
    if (type === 'leaves') {
      if (direction === 'next' && this.currentPageLeaves < this.totalPagesLeaves) {
        this.currentPageLeaves++;
      } else if (direction === 'prev' && this.currentPageLeaves > 1) {
        this.currentPageLeaves--;
      }
    } else {
      if (direction === 'next' && this.currentPageHolidays < this.totalPagesHolidays) {
        this.currentPageHolidays++;
      } else if (direction === 'prev' && this.currentPageHolidays > 1) {
        this.currentPageHolidays--;
      }
    }
    this.updatePagedData(type);
  }


  getAllCompany(){
    this.http.get<any[]>('http://localhost:3001/company').subscribe(response=>{
      this.comanyes=response.length
    })
  }

}
