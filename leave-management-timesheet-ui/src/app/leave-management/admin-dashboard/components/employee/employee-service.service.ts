import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private managerSubject = new BehaviorSubject<boolean>(false);
  manager$ = this.managerSubject.asObservable();

  private userSubject = new BehaviorSubject<boolean>(false);
  user$ = this.userSubject.asObservable();

  setManagerValue(value: boolean): void {
    this.managerSubject.next(value);
  }

  getManagerValue(): Observable<boolean> {
    return this.manager$;
  }

  setUserValue(value: boolean): void {
    this.userSubject.next(value);
  }

  getUserValue(): Observable<boolean> {
    return this.user$;
  }
}
