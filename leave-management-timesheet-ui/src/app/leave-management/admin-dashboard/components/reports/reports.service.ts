import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private userName: string | null = null;
  private userId: number | null = null;

  constructor(private http:HttpClient) { }

  setUserData(name: string, id: number): void {
    // alert(id)
    this.userName = name;
    this.userId = id;
  }

  getUserName(): string | null {
    return this.userName;
  }

  getUserId(): number | null {
    return this.userId;
  }


  getUserDetailsById(): Observable<any[]> {
    if (this.userId !== null) {
    return this.http.get<any[]>(`http://localhost:3001/users/${this.userId}`);
    }else {
      throw new Error('User ID is not set');
    }
  }

  getUserLeaveBalance(): Observable<any[]> {
    if (this.userId !== null) {
      return this.http.get<any[]>(`http://localhost:3001/user-leave-balance/${this.userId}`);
    } else {
      throw new Error('User ID is not set');
    }
  }

  getUserLeaveStatus(): Observable<any[]> {
    if (this.userId !== null) {
      return this.http.get<any[]>(`http://localhost:3001/user-leaves/${this.userId}`);
    } else {
      throw new Error('User ID is not set');
    }
  }
}
