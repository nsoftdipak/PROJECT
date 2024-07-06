import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MasterService } from '../../../../components/services/master.service';
import { jwtDecode } from 'jwt-decode';
import { escape } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {
  userID: number | null = null;

  constructor(private http: HttpClient, private masterService: MasterService) {
    this.setUserIdFromToken();
  }

  setUserIdFromToken(): void {
    const token = localStorage.getItem('token'); // Adjust the key if your token is stored under a different key
    if (token) {
      // alert(token)
      const decodedToken: any = jwtDecode(token);
      this.userID = decodedToken.sub;
      // alert(this.userID)
    } else {
      console.error('No token found in local storage');
    }
  }

  getHolidays(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3001/holidays');
  }

  getLeaveStatus(): Observable<any[]> {
    if (this.userID !== null) {
      return this.http.get<any[]>(`http://localhost:3001/user-leaves/${this.userID}`);
    } else {
      throw new Error('User ID is not set');
    }
  }

  getUserLeave():Observable<any[]>{
    if(this.userID!=null){
      return this.http.get<any[]>(`http://localhost:3001/user-leaves/${this.userID}`)
    }
    else{
      throw new Error('User Id is not set')
    }

  }
}
