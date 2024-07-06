import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stat } from 'fs/promises';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveServiceService {

  constructor(private http: HttpClient) { }




  getLeavesByStatus(status: string): Observable<any[]> {


    return this.http.get<any[]>('http://localhost:3001/user-leaves/pending-all', { params: { status } });
  }


  getPendingLeaves(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3001/user-leaves/pending');
  }
}
