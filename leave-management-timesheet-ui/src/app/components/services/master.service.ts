import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee } from '../../leave-management/admin-dashboard/components/employee/employee.component';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { aW } from '@fullcalendar/core/internal-common';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  private isLoggedInVar: boolean = false;
  private ddata:any;
  private data: any;
  private adminId: any;
  private userId: number | null = null;
  private userDetails: any;
  private selectedEmployeeID: number | null = null;
  private baseUrl = 'http://localhost:3001/users';
  private apiUrl = 'http://localhost:3001/users';
  private apiUrl2 = 'http://localhost:3001';
  private leaveUrl = 'http://localhost:3001/user-leaves';
  private adminUrl='http://localhost:3001/users/company'
  private userDetailsSubject = new BehaviorSubject<any>(null);
  userDetails$ = this.userDetailsSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = Number(decodedToken.sub) || null;
      this.adminId = decodedToken.roles.includes('Admin') ? Number(decodedToken.sub) : null;
      this.userDetailsSubject.next(decodedToken);
    }
  }

  setLogin(status: boolean): void {
    this.isLoggedInVar = status;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInVar;
  }

  getUserId(): number | null {
    return this.userId;
  }

  getAdminId(): number | null {
    return this.adminId;
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post('http://localhost:3001/auth/login', credentials).pipe(
      tap((response: any) => {
        const token = response.access_token;
        localStorage.setItem('token', token);
        const decodedToken: any = jwtDecode(token);
        this.userId = Number(decodedToken.sub) || null;
        this.adminId = decodedToken.roles.includes('Admin') ? Number(decodedToken.sub) : null;
        this.userDetailsSubject.next(decodedToken);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userDetailsSubject.next(null);
    this.userId = null;
    this.adminId = null;
  }

  getUserDetails(): Observable<any> {
    if (this.userId === null) {
      throw new Error('User ID is not set');
    }
    const url = `${this.baseUrl}/${this.userId}`;
    return this.http.get<any>(url).pipe(
      tap(details => this.userDetails = details)
    );
  }

  getAdminDetails(): Observable<any> {
    if (this.adminId === null) {
      throw new Error('Admin ID is not set');
    }
    const url = `${this.baseUrl}/${this.adminId}`;
    return this.http.get<any>(url).pipe(
      tap(details => this.userDetails = details)
    );
  }

  getStoredUserDetails(): any {
    return this.userDetails;
  }

  // getEmployees(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(this.apiUrl).pipe(
  //     tap(employees => console.log('Fetched employees:', employees))
  //   );
  // }

//   getEmployees(): Observable<Employee[]> {
//     const params = new HttpParams().set('adminId', this.adminId.toString());
//     alert(this.adminId)
//     // const parm=Number(params)
// alert(params)
//     return this.http.get<Employee[]>(this.adminUrl, { params }).pipe(
//       tap(details => this.userDetails = details)
//     );
//   }

  
  setSelectedEmployeeID(employeeID: any): void {
    this.selectedEmployeeID = employeeID;
  }

  getUserDetailsById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`);
  }

  getEmployeeById(): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${this.selectedEmployeeID}`);
  }

  getUserData(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  addEmployee(employeeData: any): Observable<any> {
    return this.http.post<any>('http://localhost:3001/users', employeeData);
  }

  getAllLocations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl2}/locations`);
  }

  getHolidays(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3001/holidays');
  }

  // getPendingLeaves(): Observable<any[]> {
  //   return this.http.get<any[]>('http://localhost:3001/user-leaves/pending');
  // }




  
  // getPAndingLeavesAdmin(): Observable<any[]> {
  //   return this.http.get<any[]>(`http://localhost:3001/user-leaves/pending-admin-leaves?managerId=${this.adminId}`);
  // }

  getLeavesByStatusAndManagerId(status: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3001/user-leaves/leaves-by-status?status=${status}&managerId=${this.adminId}`);
  }

  updateLeaveStatus(leaveId: number, status: string, message?: string): Observable<void> {
    const url = message
      ? `${this.leaveUrl}/${leaveId}/status/${status}?message=${encodeURIComponent(message)}`
      : `${this.leaveUrl}/${leaveId}/status/${status}`;
    return this.http.patch<void>(url, {});
  }

  getTodaysLeaves(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3001/user-leaves/todaysLeave');
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3001/users/role/admin`);
  }



  getAllRoles():Observable<any[]>{
    return this.http.get<any[]>(`http://localhost:3001/roles`)
  }

  getAllCompony():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3001/company')
  }


  createLeave(formData:any):Observable<any>
  {
    return this.http.post<any>('http://localhost:3001/leave', formData)
  }
  

  // getComponyLeave():Observable<any[]>{
  //   return this.http.get<any[]>('http://localhost:3001/company_leaves')
  // }

  getAllComponyLeaveType():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3001/company-leaves')
  }


  updateLeaveType(id:number, data:any):Observable<any>{
    return this.http.put(`http://localhost:3001/company-leaves/${id}`, data);
  }

  updateHoliday(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/holidays/${id}`, data);
  }
  

  fetchUserLeaveBalance()
  {
    return this.http.get<any[]>('http://localhost:3001/user-leave-balance');
  }


  updateUserLeaveBalance(id: number, data: any): Observable<any> {
    console.log('Sending PATCH request to backend with data:', data); // Log the data being sent
    return this.http.patch(`http://localhost:3001/user-leave-balance/${id}`, data); // Adjust the endpoint as necessary
  }



  getAllLeaveType(): Observable<any> {
    this.ddata=this.http.get<any[]>(`http://localhost:3001/leave`);
    alert(this.ddata.name)
    return this.ddata;
  }



  getAdminEmpoyee():Observable<any>
  {
    return this.http.get<any[]>(`http://localhost:3001/users/data?adminId=${this.adminId}`)
  }
}
