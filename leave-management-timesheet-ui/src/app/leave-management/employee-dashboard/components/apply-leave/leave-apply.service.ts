import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Observable } from 'rxjs';


// dto/check-leave-policy.dto.ts
interface CheckLeavePolicyDto {
  leaveTypeId: string;
  userId: number;
  totalLeaveDays: number;
}


@Injectable({
  providedIn: 'root'
})
export class LeaveApplyService {

  LeavePolice:any[]=[];
  constructor(private http:HttpClient) { }


  checkLeavePolicy(leaveTypeId: string, userId: number, totalLeaveDays: number): Observable<{ isAllowed: boolean, message: string }> {
    alert("ghjkl./")
    const checkLeavePolicyDto: CheckLeavePolicyDto = { leaveTypeId, userId, totalLeaveDays };
    return this.http.post<{ isAllowed: boolean, message: string }>(`http://localhost:3001/leave-request-settings/check-leave-policy/`, checkLeavePolicyDto);
  }
}  
