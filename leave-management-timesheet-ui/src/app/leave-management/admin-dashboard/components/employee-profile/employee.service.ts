import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }



  getLeavesByStatusAndUserId(status: string, userId: number): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3001/user-leaves', {
      params: { status, userId: userId.toString() }
    });
  }
  


}
 