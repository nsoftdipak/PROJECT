import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../../../../../components/services/master.service';


@Component({
  selector: 'app-create-holiday-modal',
  templateUrl: './create-holiday-modal.component.html',
  styleUrl: './create-holiday-modal.component.css'
})
export class CreateHolidayModalComponent implements OnInit {
  selectedDate: string = '';
  occasion: string = '';
  locationId: number | undefined;
  isOptional: boolean = false;
  userId: number = 17; // Simulating a logged-in user with ID 1
  locations: any[] = [];
  holiday:any[]=[];
  loggedInUserId: number | null = null;


  constructor(public activeModal: NgbActiveModal, private http: HttpClient, private masterService:MasterService) { }

  ngOnInit(): void {
    this.fetchLocations();
    this.getHolidays();
    this.loggedInUserId = this.masterService.getAdminId();
    }

  fetchLocations(): void {
    this.masterService.getAllLocations().subscribe(
      (data: Location[]) => {
        this.locations = data;
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }


  getHolidays():void{

    this.masterService.getHolidays().subscribe((responce)=>
    {
     this.holiday=responce;
    })

  }

  save(): void {
    const locationId = Number(this.locationId);
    const data = {
      occasion_date: this.selectedDate,
      occasion: this.occasion,
      created_by: this.loggedInUserId,
      updated_by: this.loggedInUserId,
      location: locationId,
      is_optional: this.isOptional,
      created_at: new Date(), // Adding created_at field
      updated_at: new Date()  // Adding updated_at field
    };

    console.log('Data to send:', data);

    this.http.post('http://localhost:3001/holidays', data)
      .subscribe(
        response => {
          console.log('Data sent successfully', response);
          this.activeModal.close(data);
        },
        error => {
          console.error('Error sending data', error);
        }
      );
  }

  dismiss(): void {
    this.activeModal.dismiss('cancel');
  }
}
