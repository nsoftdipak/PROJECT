import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  constructor(private http:HttpClient) { }



  getLeavesByStatus(status: string):Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3001/user-leaves/pending-all', { params: { status } });
  }
}
