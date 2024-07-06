import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateModalComponent } from '../calendar/date-modal/date-modal.component';
import { CreateHolidayModalComponent } from './create-holiday-modal/create-holiday-modal.component';
import { MasterService } from '../../../../components/services/master.service';
import { EditHolidayModalComponent } from './edit-holiday-modal/edit-holiday-modal.component';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css'
})
export class HolidayComponent  implements OnInit{

  holidays:any[]=[]


  constructor(private modalService: NgbModal, private masterService:MasterService) { }

  ngOnInit(): void {
      this.getHolidays()
  }

  openCreateHolidayModal(): void {
    const modalRef = this.modalService.open(CreateHolidayModalComponent);
    modalRef.result.then((result) => {
      if (result === 'save') {
        // Handle save logic if needed
      }
    }, (reason) => {
      console.log('Modal dismissed');
    });
  }


  openEditHolidayModal(holiday: any): void {
    const modalRef = this.modalService.open(EditHolidayModalComponent);
    modalRef.componentInstance.selectedDate = holiday.occasion_date;
    modalRef.componentInstance.occasion = holiday.occasion;
    modalRef.componentInstance.locationId = holiday.location_id;
    modalRef.componentInstance.isOptional = holiday.is_optional;

    modalRef.result.then((result) => {
      if (result === 'save') {
        this.getHolidays(); // Refresh the holidays list
      }
    }, (reason) => {
      console.log('Modal dismissed');
    });
  }


  getHolidays():void{

    this.masterService.getHolidays().subscribe((responce)=>
    {
     this.holidays=responce;
    })
  }

}
