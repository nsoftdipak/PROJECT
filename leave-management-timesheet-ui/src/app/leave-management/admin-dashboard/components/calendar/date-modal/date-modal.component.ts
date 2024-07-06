import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-date-modal',
  templateUrl: './date-modal.component.html',
  styleUrls: ['./date-modal.component.css']
})
export class DateModalComponent implements OnInit {
  selectedDate: string = '';
  occasion: string = '';
  locationId: number | undefined;
  isOptional: boolean = false;
  userId: number = 1; // Simulating a logged-in user with ID 1
  locations: any[] = [
    { id: 1, name: 'Location 1' },
    { id: 2, name: 'Location 2' },
    { id: 3, name: 'Location 3' }
  ];

  constructor(public activeModal: NgbActiveModal, private http: HttpClient) { }

  ngOnInit(): void {
    // Initializing data directly within the component
  }

  save(): void {
    const locationId = Number(this.locationId);
    alert(locationId)
    const data = {
      occasion_date: this.selectedDate,
      occasion: this.occasion,
      created_by: this.userId,
      updated_by: this.userId,
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
