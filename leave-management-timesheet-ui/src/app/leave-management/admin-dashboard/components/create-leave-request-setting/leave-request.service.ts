import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  constructor(private http:HttpClient) { }


  getAllLeaveType():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3001/leave')
  }


  getAllCompany():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3001/company')
  }

  createLeaveRequestSetting(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3001/leave-request-settings', data);
  }
}
